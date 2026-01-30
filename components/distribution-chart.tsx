"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface DistributionChartProps {
  entradas: number;
  saidas: number;
}

const COLORS = {
  entradas: "#10B981",
  saidas: "#EF4444",
};

export function DistributionChart({
  entradas,
  saidas,
}: DistributionChartProps) {
  const total = entradas + saidas;

  if (total === 0) {
    return null;
  }

  const data = [
    {
      name: "Entradas",
      value: entradas,
      percent: ((entradas / total) * 100).toFixed(1),
    },
    {
      name: "Saídas",
      value: saidas,
      percent: ((saidas / total) * 100).toFixed(1),
    },
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-6">
        Distribuição Financeira
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${percent}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.name === "Entradas" ? COLORS.entradas : COLORS.saidas
                }
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#e1e5ebff",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB"
            }}
            formatter={(value) => [
              `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
              "",
            ]}
          />
          <Legend
            wrapperStyle={{ color: "#F9FAFB" }}
            formatter={(value) => value}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-1">Entradas</p>
          <p className="text-xl font-bold text-green-500">
            R$ {entradas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-1">Saídas</p>
          <p className="text-xl font-bold text-red-500">
            R$ {saidas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
}
