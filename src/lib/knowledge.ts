import { knowledgeBase, type KnowledgeEntry } from "@/data/knowledge";
import { searchKnowledgeZVec } from "@/lib/zvec";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

export function normalizeKeyword(text: string): string {
  return normalize(text);
}

/**
 * Hybrid Vector (Alibaba ZVec) + Keyword Search for knowledge base matching.
 */
export function matchKnowledge(
  question: string,
  entries: KnowledgeEntry[],
): { entry: KnowledgeEntry; score: number } | null {
  const q = normalize(question);
  const qWords = q.split(/\s+/).filter((w) => w.length > 2);

  let best: { entry: KnowledgeEntry; score: number } | null = null;

  // 1. Keyword search scoring
  for (const entry of entries) {
    let score = 0;
    for (const kw of entry.keywords) {
      const nk = normalizeKeyword(kw);
      if (nk.length < 3) continue;
      if (q.includes(nk)) {
        score += nk.length >= 8 ? 6 : 3;
      }
    }
    for (const word of qWords) {
      for (const kw of entry.keywords) {
        const nk = normalizeKeyword(kw);
        if (nk.includes(word) || word.includes(nk)) {
          score += 1;
        }
      }
    }
    if (score > (best?.score ?? 0)) {
      best = { entry, score };
    }
  }

  if (best && best.score >= 3) return best;

  // 2. Vector search fallback via Alibaba ZVec
  const zvecHits = searchKnowledgeZVec(question, entries, 1);
  if (zvecHits.length > 0 && zvecHits[0].entry.answer) {
    const zHit = zvecHits[0];
    const matchedOriginal = entries.find((e) => e.id === zHit.entry.id) || zHit.entry;
    return { entry: matchedOriginal, score: 5 };
  }

  return null;
}

/** Đếm số keyword trong KB (dùng cho admin). */
export function getKnowledgeEntries(): KnowledgeEntry[] {
  return knowledgeBase;
}
