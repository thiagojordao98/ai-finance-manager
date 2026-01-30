"use client";

import { User, LogOut, Smartphone, CheckCircle } from "lucide-react";
import { authClient } from "@/lib/neon-auth/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WhatsAppLinkModal } from "./whatsapp-link-modal";

interface DashboardHeaderProps {
  userEmail: string | null;
  whatsAppLinked?: boolean;
}

export function DashboardHeader({
  userEmail,
  whatsAppLinked = false,
}: DashboardHeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isLinked, setIsLinked] = useState(whatsAppLinked);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth/sign-in");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Dashboard Financeiro
          </h1>
          <p className="text-gray-400">Controle total das suas finanças</p>
        </div>
        <div className="flex items-center gap-3">
          {/* WhatsApp Link Button */}
          {isLinked ? (
            <div className="flex items-center gap-2 bg-green-600/10 px-4 py-2 rounded-lg border border-green-500/20">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400">WhatsApp vinculado</span>
            </div>
          ) : (
            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg border border-green-500/20 transition-colors"
              title="Vincular WhatsApp"
            >
              <Smartphone className="w-5 h-5 text-white" />
              <span className="text-sm text-white">Vincular WhatsApp</span>
            </button>
          )}

          <div className="flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-300">{userEmail ?? "—"}</span>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg border border-red-500/20 transition-colors"
            title="Sair"
          >
            <LogOut className="w-5 h-5 text-white" />
            <span className="text-sm text-white">
              {isLoggingOut ? "Saindo..." : "Sair"}
            </span>
          </button>
        </div>
      </div>

      {/* WhatsApp Link Modal */}
      <WhatsAppLinkModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        onSuccess={() => {
          setIsLinked(true);
          setIsWhatsAppModalOpen(false);
        }}
      />
    </div>
  );
}
