import { getDb, COLLECTIONS } from "./db";
import { ObjectId } from "mongodb";
import type { DocumentChunk } from "./documentParser";

export type StoredDocument = {
  _id?: string;
  id?: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  title: string;
  chunks: DocumentChunk[];
  totalChunks: number;
  extractedChars: number;
  enabled: boolean;
  uploadedAt: string;
};

declare global {
  // eslint-disable-next-line no-var
  var _ewMemoryDocuments: StoredDocument[] | undefined;
}

if (!globalThis._ewMemoryDocuments) {
  globalThis._ewMemoryDocuments = [];
}

export async function getAllDocuments(): Promise<StoredDocument[]> {
  try {
    const db = await getDb();
    if (db) {
      const docs = await db
        .collection(COLLECTIONS.documents)
        .find({})
        .sort({ uploadedAt: -1 })
        .toArray();
      if (docs.length > 0) {
        return docs.map((d) => ({
          _id: String(d._id),
          id: String(d._id),
          fileName: d.fileName,
          fileSize: d.fileSize,
          fileType: d.fileType,
          title: d.title,
          chunks: d.chunks || [],
          totalChunks: d.totalChunks || 0,
          extractedChars: d.extractedChars || 0,
          enabled: d.enabled !== false,
          uploadedAt: d.uploadedAt,
        }));
      }
    }
  } catch (err) {
    console.warn("[documentStore] DB fetch error, using memory docs:", err);
  }

  return (globalThis._ewMemoryDocuments || []).map((d) => ({ ...d }));
}

export async function saveDocument(doc: Omit<StoredDocument, "_id" | "id">): Promise<string> {
  const newId = new ObjectId().toString();
  const fullDoc: StoredDocument = {
    ...doc,
    _id: newId,
    id: newId,
  };

  try {
    const db = await getDb();
    if (db) {
      const result = await db.collection(COLLECTIONS.documents).insertOne({
        _id: new ObjectId(newId),
        ...doc,
      });
      return String(result.insertedId);
    }
  } catch (err) {
    console.warn("[documentStore] DB save error, saving to memory:", err);
  }

  globalThis._ewMemoryDocuments = globalThis._ewMemoryDocuments || [];
  globalThis._ewMemoryDocuments.unshift(fullDoc);
  return newId;
}

export async function deleteDocument(id: string): Promise<boolean> {
  try {
    const db = await getDb();
    if (db) {
      if (ObjectId.isValid(id)) {
        await db.collection(COLLECTIONS.documents).deleteOne({ _id: new ObjectId(id) });
      }
    }
  } catch (err) {
    console.warn("[documentStore] DB delete error:", err);
  }

  if (globalThis._ewMemoryDocuments) {
    globalThis._ewMemoryDocuments = globalThis._ewMemoryDocuments.filter((d) => d.id !== id && d._id !== id);
  }
  return true;
}

export async function toggleDocument(id: string, enabled: boolean): Promise<boolean> {
  try {
    const db = await getDb();
    if (db) {
      if (ObjectId.isValid(id)) {
        await db.collection(COLLECTIONS.documents).updateOne({ _id: new ObjectId(id) }, { $set: { enabled } });
      }
    }
  } catch (err) {
    console.warn("[documentStore] DB toggle error:", err);
  }

  if (globalThis._ewMemoryDocuments) {
    const doc = globalThis._ewMemoryDocuments.find((d) => d.id === id || d._id === id);
    if (doc) doc.enabled = enabled;
  }
  return true;
}
