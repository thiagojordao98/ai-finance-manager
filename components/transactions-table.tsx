import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Transaction } from "@/db/schema";
import { AddTransactionButton } from "./add-transaction-button";
import { TransactionDeleteButton } from "./transaction-delete-button";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Transações</h2>
        <div className="flex gap-3">
          <AddTransactionButton type="entrada" />
          <AddTransactionButton type="saida" />
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-400 mb-4">
            Nenhuma transação registrada ainda
          </p>
          <p className="text-sm text-gray-500">
            Clique em "Entrada" ou "Saída" para adicionar sua primeira transação
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-950">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(transaction.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {transaction.type === "entrada" ? (
                        <>
                          <div className="p-1 bg-green-500/10 rounded">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          </div>
                          <span className="text-sm font-medium text-green-500">
                            Entrada
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="p-1 bg-red-500/10 rounded">
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          </div>
                          <span className="text-sm font-medium text-red-500">
                            Saída
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span
                      className={`text-sm font-semibold ${
                        transaction.type === "entrada"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type === "entrada" ? "+" : "-"}
                      {formatCurrency(parseFloat(transaction.amount))}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <TransactionDeleteButton
                      transactionId={transaction.id}
                      description={transaction.description}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
