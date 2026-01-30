'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { db } from '@/db';
import { transactions } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

/**
 * Add a new transaction (entrada or saida)
 * Scoped to authenticated user
 */
export async function addTransaction(formData: FormData) {
  // Require authentication
  const user = await requireAuth();

  // Extract form data
  const type = formData.get('type') as 'entrada' | 'saida';
  const description = formData.get('description') as string;
  const amount = formData.get('amount') as string;

  // Validate inputs
  if (!type || !description || !amount) {
    throw new Error('Todos os campos são obrigatórios');
  }

  if (type !== 'entrada' && type !== 'saida') {
    throw new Error('Tipo inválido');
  }

  const numAmount = parseFloat(amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    throw new Error('Valor deve ser um número positivo');
  }

  // Insert transaction scoped to user
  await db.insert(transactions).values({
    userId: user.id,
    type,
    description,
    amount: numAmount.toFixed(2),
  });

  // Revalidate dashboard
  revalidatePath('/');
}

/**
 * Delete a transaction
 * Only if it belongs to the authenticated user
 */
export async function deleteTransaction(transactionId: string) {
  // Require authentication
  const user = await requireAuth();

  // Delete transaction (only if it belongs to the authenticated user)
  await db
    .delete(transactions)
    .where(
      and(
        eq(transactions.id, transactionId),
        eq(transactions.userId, user.id)
      )
    );

  // Revalidate dashboard
  revalidatePath('/');
}
