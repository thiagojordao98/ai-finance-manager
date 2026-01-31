import { MessageSquare, Sparkles } from "lucide-react";
import { CTAButton } from "./cta-button";
import { Badge } from "./badge";
import { SectionContainer } from "./section-container";
import Image from "next/image";

export function LandingHero() {
  return (
    <SectionContainer className="pt-16 sm:pt-24 pb-12 sm:pb-20">
      <div className="flex flex-col items-center text-center">
        {/* Badge */}
        <Badge variant="success" className="mb-6 sm:mb-8">
          <MessageSquare className="w-4 h-4" />
          Controle financeiro via WhatsApp
        </Badge>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight max-w-4xl">
          Controle suas finanças{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
            pelo WhatsApp
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-3xl leading-relaxed px-4">
          Saiu do mercado? Registre seu gasto em segundos pelo WhatsApp e
          acompanhe tudo em um{" "}
          <span className="text-white font-medium">dashboard profissional</span>
        </p>

        {/* CTA Button */}
        <CTAButton
          href="/auth/sign-up"
          variant="primary"
          size="large"
          showArrow
          className="w-full sm:w-auto mb-12 sm:mb-16"
        >
          Começar Gratuitamente
        </CTAButton>

        {/* WhatsApp Preview - Mobile First */}
        <div className="w-full max-w-md mx-auto relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>

          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-2xl">
            {/* WhatsApp Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-800">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  Assistente Financeiro
                </h3>
                <p className="text-green-500 text-xs">Online</p>
              </div>
            </div>

            {/* Message Examples */}
            <div className="space-y-3">
              {/* User message */}
              <div className="flex justify-end">
                <div className="bg-green-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm">
                    Registrar nova entrada de 15000 com comissão
                  </p>
                  <span className="text-xs text-green-100 mt-1 block">
                    14:40
                  </span>
                </div>
              </div>

              {/* Bot confirmation */}
              <div className="flex justify-start">
                <div className="bg-gray-800 text-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm mb-2">
                    Entendi! Vou registrar uma{" "}
                    <span className="text-green-400 font-medium">ENTRADA</span>:
                  </p>
                  <p className="text-sm">📝 Descrição: Comissão</p>
                  <p className="text-sm">💰 Valor: R$ 15.000,00</p>
                  <p className="text-xs text-gray-400 mt-2">
                    ✅ Confirma o lançamento?
                  </p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    14:40
                  </span>
                </div>
              </div>

              {/* User confirmation */}
              <div className="flex justify-end">
                <div className="bg-green-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm">Ok</p>
                  <span className="text-xs text-green-100 mt-1 block">
                    14:40
                  </span>
                </div>
              </div>

              {/* Success message */}
              <div className="flex justify-start">
                <div className="bg-gray-800 text-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] border-l-4 border-green-500">
                  <p className="text-sm">
                    ✅ Pronto! Sua entrada de R$ 15.000,00 foi registrada com
                    sucesso!
                  </p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    14:40
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span>Sem instalação de apps</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-700 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span>Confirmação automática</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-700 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span>100% gratuito</span>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
