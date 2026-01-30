"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addTransaction } from "@/app/actions";

interface AddTransactionModalProps {
  type: "entrada" | "saida";
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionModal({
  type,
  isOpen,
  onClose,
}: AddTransactionModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      await addTransaction(formData);
      onClose();
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao adicionar transação",
      );
    } finally {
      setLoading(false);
    }
  };

  const title = type === "entrada" ? "Nova Entrada" : "Nova Saída";
  const color = type === "entrada" ? "green" : "red";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full shadow-2xl">
        <div
          className={`px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-${color}-500/5`}
        >
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input type="hidden" name="type" value={type} />

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Descrição
            </label>
            <input
              type="text"
              id="description"
              name="description"
              required
              className="w-full px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Salário, Aluguel, Compras..."
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Valor (R$)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              step="0.01"
              min="0.01"
              className="w-full px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 bg-${color}-600 hover:bg-${color}-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={loading}
            >
              {loading ? "Adicionando..." : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
