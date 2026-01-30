import { pgTable, uuid, text, timestamp, numeric, pgEnum, index, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Transaction type enum
export const transactionTypeEnum = pgEnum('transaction_type', ['entrada', 'saida']);

// Users table (managed by Neon Auth + external identities)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique(), // nullable - used by Neon Auth
  externalIdentity: text('external_identity').unique(), // nullable - used by n8n/WhatsApp
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  externalIdentityIdx: index('users_external_identity_idx').on(table.externalIdentity),
}));

// Transactions table
export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: transactionTypeEnum('type').notNull(),
  description: text('description').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('transactions_user_id_idx').on(table.userId),
  createdAtIdx: index('transactions_created_at_idx').on(table.createdAt),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
}));

// TypeScript types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
export type OtpVerification = typeof otpVerifications.$inferSelect;
export type NewOtpVerification = typeof otpVerifications.$inferInsert;

// OTP Verifications table (for WhatsApp phone verification)
export const otpVerifications = pgTable('otp_verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  phoneNumber: text('phone_number').notNull(),
  code: text('code').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  verified: boolean('verified').default(false).notNull(),
  attempts: integer('attempts').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('otp_verifications_user_id_idx').on(table.userId),
  phoneNumberIdx: index('otp_verifications_phone_number_idx').on(table.phoneNumber),
}));

// OTP Verifications relations
export const otpVerificationsRelations = relations(otpVerifications, ({ one }) => ({
  user: one(users, {
    fields: [otpVerifications.userId],
    references: [users.id],
  }),
}));
