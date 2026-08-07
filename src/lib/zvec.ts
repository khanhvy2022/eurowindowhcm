import path from "path";
import fs from "fs";
import { knowledgeBase, type KnowledgeEntry } from "@/data/knowledge";

const VECTOR_DIM = 64;
const DB_DIR_NAME = ".zvec_db";

let zvecModule: any = null;
let isInitialized = false;
let collectionInstance: any = null;

function loadZVec() {
  if (zvecModule) return zvecModule;
  try {
    // Dynamic require to prevent Turbopack static compilation of native .node binaries
    const req = eval("require");
    zvecModule = req("@zvec/zvec");
    return zvecModule;
  } catch (err) {
    console.warn("[ZVec Native Load Warning]: @zvec/zvec module not loaded natively", err);
    return null;
  }
}

function ensureInitialized() {
  if (isInitialized) return;
  const zv = loadZVec();
  if (!zv) {
    isInitialized = true;
    return;
  }
  try {
    zv.ZVecInitialize({ logLevel: 2 });
  } catch {
    // Single process guard
  }
  isInitialized = true;
}

/**
 * Fast deterministic vectorizer for text to 64-dim float vector
 */
export function textToVector(text: string, dim: number = VECTOR_DIM): number[] {
  const norm = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();

  const words = norm.split(/\s+/).filter(Boolean);
  const vec = new Array(dim).fill(0);

  if (words.length === 0) return vec;

  for (const word of words) {
    let hash = 5381;
    for (let i = 0; i < word.length; i++) {
      hash = (hash << 5) + hash + word.charCodeAt(i);
      hash = hash & hash;
    }
    const idx = Math.abs(hash) % dim;
    vec[idx] += word.length >= 4 ? 2.0 : 1.0;
  }

  // Character bigrams for fine-grained matching
  for (let i = 0; i < norm.length - 1; i++) {
    const bg = norm.slice(i, i + 2);
    let hash = 0;
    for (let j = 0; j < bg.length; j++) {
      hash = (hash * 31 + bg.charCodeAt(j)) & 0x7fffffff;
    }
    const idx = hash % dim;
    vec[idx] += 0.5;
  }

  // L2 Normalize
  let sumSq = 0;
  for (let i = 0; i < dim; i++) sumSq += vec[i] * vec[i];
  const mag = Math.sqrt(sumSq);
  if (mag > 0) {
    for (let i = 0; i < dim; i++) vec[i] /= mag;
  }

  return vec;
}

/**
 * Get or initialize Alibaba ZVec collection instance
 */
export function getZVecCollection() {
  if (collectionInstance) return collectionInstance;
  ensureInitialized();

  const zv = loadZVec();
  if (!zv) return null;

  const dbPath = path.join(process.cwd(), DB_DIR_NAME);

  if (fs.existsSync(dbPath)) {
    try {
      collectionInstance = zv.ZVecOpen(dbPath);
      return collectionInstance;
    } catch {
      // Recreate cleanly if schema mismatch
      fs.rmSync(dbPath, { recursive: true, force: true });
    }
  }

  try {
    const schema = new zv.ZVecCollectionSchema({
      name: "knowledge_base",
      fields: [
        { name: "id", dataType: zv.ZVecDataType.STRING },
        { name: "category", dataType: zv.ZVecDataType.STRING },
        { name: "question", dataType: zv.ZVecDataType.STRING },
        { name: "answer", dataType: zv.ZVecDataType.STRING },
      ],
      vectors: [
        {
          name: "embedding",
          dataType: zv.ZVecDataType.VECTOR_FP32,
          dimension: VECTOR_DIM,
          indexParams: {
            indexType: zv.ZVecIndexType.HNSW,
            metricType: zv.ZVecMetricType.COSINE,
          },
        },
      ],
    });

    collectionInstance = zv.ZVecCreateAndOpen(dbPath, schema);
    syncKnowledgeBaseToZVec(collectionInstance, knowledgeBase);

    return collectionInstance;
  } catch (err) {
    console.error("[ZVec Schema Create Error]:", err);
    return null;
  }
}

/**
 * Sync knowledge entries into ZVec vector database
 */
export function syncKnowledgeBaseToZVec(collection: any, entries: KnowledgeEntry[]) {
  if (!collection || entries.length === 0) return;

  const docs = entries.map((e) => {
    const fullText = `${e.category} ${e.question} ${e.keywords.join(" ")} ${e.answer}`;
    const vec = textToVector(fullText);
    return {
      id: e.id,
      fields: {
        id: e.id,
        category: e.category,
        question: e.question,
        answer: e.answer,
      },
      vectors: {
        embedding: vec,
      },
    };
  });

  try {
    collection.upsertSync(docs);
  } catch {
    try {
      collection.insertSync(docs);
    } catch {
      // ignore existing keys
    }
  }
}

export type ZVecSearchResult = {
  entry: KnowledgeEntry;
  score: number;
};

/**
 * Perform vector search using Alibaba ZVec vector engine
 */
export function searchKnowledgeZVec(
  queryText: string,
  entries: KnowledgeEntry[],
  topK: number = 3
): ZVecSearchResult[] {
  try {
    const col = getZVecCollection();
    if (!col) return [];

    if (entries.length > 0) {
      syncKnowledgeBaseToZVec(col, entries);
    }

    const queryVec = textToVector(queryText);
    const results = col.querySync({
      fieldName: "embedding",
      vector: queryVec,
      topk: topK,
    });

    return (results || []).map((r: any) => ({
      entry: {
        id: String(r.fields?.id || r.id),
        category: String(r.fields?.category || ""),
        keywords: [],
        question: String(r.fields?.question || ""),
        answer: String(r.fields?.answer || ""),
      },
      score: r.score ?? 0,
    }));
  } catch (err) {
    console.error("[ZVec Search Error]:", err);
    return [];
  }
}
