import { ShoppingCart, MessageSquare, LineChart } from "lucide-react";
import { FeatureCard } from "./feature-card";
import { SectionContainer } from "./section-container";

export function HowItWorks() {
  return (
    <SectionContainer className="py-12 sm:py-20" id="como-funciona">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Como funciona?
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
          Apenas 3 passos simples para ter suas finanças organizadas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <FeatureCard
          icon={ShoppingCart}
          title="1. Faça sua compra"
          description="Realize suas compras e transações normalmente no seu dia a dia"
          iconColor="text-purple-500"
        />

        <FeatureCard
          icon={MessageSquare}
          title="2. Envie no WhatsApp"
          description="Abra o WhatsApp e registre o valor em segundos com uma mensagem simples"
          iconColor="text-green-500"
        />

        <FeatureCard
          icon={LineChart}
          title="3. Acompanhe tudo"
          description="Veja seus gastos atualizados em tempo real no dashboard profissional"
          iconColor="text-blue-500"
        />
      </div>

      {/* Flow visualization */}
      <div className="mt-12 sm:mt-16 flex items-center justify-center gap-4 sm:gap-8">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-500 font-bold text-lg sm:text-xl">
            1
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-purple-500/50 to-green-500/50"></div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 font-bold text-lg sm:text-xl">
            2
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-green-500/50 to-blue-500/50"></div>
        </div>

        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500 font-bold text-lg sm:text-xl">
          3
        </div>
      </div>
    </SectionContainer>
  );
}
