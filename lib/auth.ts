import { neonAuth } from "@neondatabase/auth/next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAuthenticatedUser() {
  const { user } = await neonAuth();
  if (!user) return null;

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (existingUser) {
    return existingUser;
  }

  const [createdUser] = await db
    .insert(users)
    .values({
      id: user.id,
      email: (user as any).email ?? null,
    })
    .returning();

  return createdUser;
}

/**
 * Require authentication - throws if no user
 */
export async function requireAuth() {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
