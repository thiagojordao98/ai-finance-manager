import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface SummaryCardsProps {
  entradas: number;
  saidas: number;
  saldo: number;
}

export function SummaryCards({ entradas, saidas, saldo }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Entradas Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/30 transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Entradas
          </h3>
          <div className="p-2 bg-green-500/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
        </div>
        <p className="text-3xl font-bold text-green-500">
          {formatCurrency(entradas)}
        </p>
      </div>

      {/* Saídas Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Saídas
          </h3>
          <div className="p-2 bg-red-500/10 rounded-lg">
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
        </div>
        <p className="text-3xl font-bold text-red-500">
          {formatCurrency(saidas)}
        </p>
      </div>

      {/* Saldo Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/30 transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Saldo
          </h3>
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Wallet className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <p
          className={`text-3xl font-bold ${saldo >= 0 ? "text-blue-500" : "text-red-500"}`}
        >
          {formatCurrency(saldo)}
        </p>
      </div>
    </div>
  );
}
