import { requireAuth } from "@/lib/auth";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { DashboardHeader } from "@/components/dashboard-header";
import { SummaryCards } from "@/components/summary-cards";
import { TransactionsTable } from "@/components/transactions-table";
import { RefreshButton } from "@/components/refresh-button";
import { TransactionsChart } from "@/components/transactions-chart";
import { BalanceChart } from "@/components/balance-chart";
import { DistributionChart } from "@/components/distribution-chart";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  // Get authenticated user
  const user = await requireAuth();

  // Fetch all transactions for the user
  const userTransactions = await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, user.id))
    .orderBy(desc(transactions.createdAt));

  // Calculate totals
  const entradas = userTransactions
    .filter((t) => t.type === "entrada")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const saidas = userTransactions
    .filter((t) => t.type === "saida")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const saldo = entradas - saidas;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          userEmail={user.email ?? null}
          whatsAppLinked={!!user.externalIdentity}
        />

        <div className="flex justify-end mb-6">
          <RefreshButton />
        </div>

        <SummaryCards entradas={entradas} saidas={saidas} saldo={saldo} />

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionsChart transactions={userTransactions} />
          <BalanceChart transactions={userTransactions} />
        </div>

        <div className="mt-6">
          <DistributionChart entradas={entradas} saidas={saidas} />
        </div>

        <div className="mt-8">
          <TransactionsTable transactions={userTransactions} />
        </div>
      </div>
    </div>
  );
}
