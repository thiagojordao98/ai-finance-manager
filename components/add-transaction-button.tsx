"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { AddTransactionModal } from "./add-transaction-modal";

interface AddTransactionButtonProps {
  type: "entrada" | "saida";
}

export function AddTransactionButton({ type }: AddTransactionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const colors =
    type === "entrada"
      ? "bg-green-600 hover:bg-green-700 border-green-500"
      : "bg-red-600 hover:bg-red-700 border-red-500";

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${colors} text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all border`}
      >
        <Plus className="w-4 h-4" />
        {type === "entrada" ? "Entrada" : "Saída"}
      </button>

      <AddTransactionModal
        type={type}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
