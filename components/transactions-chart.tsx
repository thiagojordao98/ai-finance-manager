"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/db/schema";

interface TransactionsChartProps {
  transactions: Transaction[];
}

type PeriodType = 7 | 15 | 30;

export function TransactionsChart({ transactions }: TransactionsChartProps) {
  const [period, setPeriod] = useState<PeriodType>(7);
  // Group transactions by date
  const groupedData = transactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        timeZone: "UTC",
      });

      if (!acc[date]) {
        acc[date] = { date, entradas: 0, saidas: 0 };
      }

      const amount = parseFloat(transaction.amount);
      if (transaction.type === "entrada") {
        acc[date].entradas += amount;
      } else {
        acc[date].saidas += amount;
      }

      return acc;
    },
    {} as Record<string, { date: string; entradas: number; saidas: number }>,
  );

  const chartData = Object.values(groupedData)
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(-period); // Last N days based on selected period

  if (chartData.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
        <p className="text-gray-400">
          Adicione transações para ver os gráficos
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Entradas vs Saídas</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod(7)}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              period === 7
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
            }`}
          >
            7 dias
          </button>
          <button
            onClick={() => setPeriod(15)}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              period === 15
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
            }`}
          >
            15 dias
          </button>
          <button
            onClick={() => setPeriod(30)}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              period === 30
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
            }`}
          >
            30 dias
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
            formatter={(value) => [
              `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
              "",
            ]}
            labelStyle={{ color: "#F9FAFB" }}
          />
          <Legend
            wrapperStyle={{ color: "#F9FAFB" }}
            formatter={(value) =>
              value === "entradas" ? "Entradas" : "Saídas"
            }
          />
          <Bar dataKey="entradas" fill="#10B981" radius={[8, 8, 0, 0]} />
          <Bar dataKey="saidas" fill="#EF4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
