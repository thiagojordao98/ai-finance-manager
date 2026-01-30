"use client";

import { useState, useEffect } from "react";
import {
  X,
  Smartphone,
  Send,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { requestOTP, verifyOTP } from "@/lib/otp-actions";

interface WhatsAppLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type Step = "phone" | "otp" | "success";

export function WhatsAppLinkModal({
  isOpen,
  onClose,
  onSuccess,
}: WhatsAppLinkModalProps) {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setStep("phone");
      setPhone("");
      setOtpCode("");
      setError(null);
      setCountdown(0);
    }
  }, [isOpen]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (!isOpen) return null;

  // Format phone as user types: (XX) XXXXX-XXXX
  const formatPhoneDisplay = (value: string): string => {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 2) {
      return digits.length ? `(${digits}` : "";
    }
    if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneDisplay(e.target.value);
    setPhone(formatted);
    setError(null);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtpCode(value);
    setError(null);
  };

  const handleSendCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await requestOTP(phone);

      if (result.success) {
        setStep("otp");
        setCountdown(60); // 60 seconds cooldown for resend
      } else {
        setError(result.error || "Erro ao enviar código");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (otpCode.length !== 6) {
      setError("Digite o código de 6 dígitos");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await verifyOTP(phone, otpCode);

      if (result.success) {
        setStep("success");
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } else {
        setError(result.error || "Código inválido");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    await handleSendCode();
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-green-500/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Smartphone className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Vincular WhatsApp</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Phone Input */}
          {step === "phone" && (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Digite seu número de WhatsApp para receber o código de
                verificação.
              </p>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Número do WhatsApp
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(84) 98899-2141"
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg tracking-wide"
                  disabled={loading}
                  autoComplete="tel"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <button
                onClick={handleSendCode}
                disabled={loading || phone.replace(/\D/g, "").length < 10}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar código
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 2: OTP Input */}
          {step === "otp" && (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Digite o código de 6 dígitos enviado para{" "}
                <span className="text-white font-medium">{phone}</span>
              </p>

              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Código de verificação
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otpCode}
                  onChange={handleOtpChange}
                  placeholder="000000"
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl tracking-[0.5em] font-mono"
                  disabled={loading}
                  maxLength={6}
                  autoComplete="one-time-code"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Expira em 5 minutos</span>
                <button
                  onClick={handleResendCode}
                  disabled={countdown > 0 || loading}
                  className="text-green-400 hover:text-green-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  {countdown > 0
                    ? `Reenviar em ${countdown}s`
                    : "Reenviar código"}
                </button>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep("phone");
                    setOtpCode("");
                    setError(null);
                  }}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={handleVerifyCode}
                  disabled={loading || otpCode.length !== 6}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    "Verificar"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === "success" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  WhatsApp vinculado!
                </h3>
                <p className="text-gray-400 text-sm">
                  Agora suas transações via WhatsApp aparecerão no seu
                  dashboard.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
