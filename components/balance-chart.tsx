"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/db/schema";

interface BalanceChartProps {
  transactions: Transaction[];
}

export function BalanceChart({ transactions }: BalanceChartProps) {
  // Sort transactions by date
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  // Calculate cumulative balance
  let cumulativeBalance = 0;
  const balanceData = sortedTransactions.map((transaction) => {
    const amount = parseFloat(transaction.amount);
    if (transaction.type === "entrada") {
      cumulativeBalance += amount;
    } else {
      cumulativeBalance -= amount;
    }

    return {
      date: new Date(transaction.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        timeZone: "UTC",
      }),
      saldo: cumulativeBalance,
    };
  });

  // Get unique dates with latest balance for each date
  const uniqueDates = balanceData.reduce(
    (acc, curr) => {
      acc[curr.date] = curr.saldo;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(uniqueDates)
    .map(([date, saldo]) => ({
      date,
      saldo,
    }))
    .slice(-10); // Last 10 points

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-6">Evolução do Saldo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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
              "Saldo",
            ]}
            labelStyle={{ color: "#F9FAFB" }}
          />
          <Line
            type="monotone"
            dataKey="saldo"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
