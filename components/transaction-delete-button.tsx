"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteTransaction } from "@/app/actions";

interface TransactionDeleteButtonProps {
  transactionId: string;
  description?: string | null;
}

export function TransactionDeleteButton({
  transactionId,
  description,
}: TransactionDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteTransaction(transactionId);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao excluir transação",
      );
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {error && (
        <span className="text-xs text-red-400" title={error}>
          {error}
        </span>
      )}
      <button
        type="button"
        onClick={() => setIsConfirmOpen(true)}
        disabled={isDeleting}
        className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-600/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-600/20 disabled:cursor-not-allowed disabled:opacity-50"
        title="Excluir transação"
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        <span>{isDeleting ? "Excluindo..." : "Excluir"}</span>
      </button>

      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 bg-red-500/5 px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                Excluir transação
              </h2>
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isDeleting}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-300">
                Tem certeza que deseja excluir esta transação?
              </p>
              {description && (
                <p className="text-sm text-gray-400">
                  <span className="font-medium text-gray-200">Descrição:</span>{" "}
                  {description}
                </p>
              )}
              <p className="text-sm text-red-400">
                Essa ação não pode ser desfeita.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsConfirmOpen(false)}
                  disabled={isDeleting}
                  className="flex-1 rounded-lg bg-gray-800 px-4 py-2 font-medium text-gray-300 transition-colors hover:bg-gray-700 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isDeleting ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
