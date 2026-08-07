import { NextRequest } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/db";
import { checkAuth, unauthorized } from "@/lib/auth";
import { type Role, ALL_ROLES } from "@/lib/rbac";

export type User = {
  username: string;
  password: string;
  role: Role;
  createdAt: string;
};

const COLLECTION = "users";

export async function getUsers(): Promise<Omit<User, "password">[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const docs = await db.collection(COLLECTION).find({}).toArray();
    return docs.map((d) => {
      const { password, ...rest } = d as unknown as User;
      return rest;
    });
  } catch {
    return [];
  }
}

export async function getUser(username: string): Promise<User | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const doc = await db.collection(COLLECTION).findOne({ username });
    return doc ? (doc as unknown as User) : null;
  } catch {
    return null;
  }
}

export async function createUser(username: string, password: string, role: Role): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    const exists = await db.collection(COLLECTION).findOne({ username });
    if (exists) return false;
    await db.collection(COLLECTION).insertOne({
      username,
      password,
      role,
      createdAt: new Date().toISOString(),
    });
    return true;
  } catch {
    return false;
  }
}

export async function deleteUser(username: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.collection(COLLECTION).deleteOne({ username });
    return true;
  } catch {
    return false;
  }
}

export async function updateUserRole(username: string, role: Role): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.collection(COLLECTION).updateOne({ username }, { $set: { role } });
    return true;
  } catch {
    return false;
  }
}
