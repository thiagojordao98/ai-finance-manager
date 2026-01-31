import { MessageSquare } from "lucide-react";
import { CTAButton } from "./cta-button";
import { Badge } from "./badge";
import { SectionContainer } from "./section-container";

export function FinalCTA() {
  return (
    <SectionContainer className="py-16 sm:py-24">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>

        <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* Badge */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <Badge variant="success" size="large">
                Comece Agora - 100% Gratuito
              </Badge>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Pronto para organizar{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
                suas finanças?
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Comece agora mesmo a controlar seus gastos pelo WhatsApp. Sem
              complicação, sem mensalidade, sem compromisso.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton
                href="/auth/sign-up"
                variant="primary"
                size="large"
                showArrow
                className="w-full sm:w-auto"
              >
                <MessageSquare className="w-5 h-5" />
                Conectar WhatsApp
              </CTAButton>

              <CTAButton
                href="/auth/sign-in"
                variant="secondary"
                size="large"
                className="w-full sm:w-auto"
              >
                Já tenho conta
              </CTAButton>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Sem cartão de crédito</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-700 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Configuração em 2 minutos</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-700 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Suporte via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
