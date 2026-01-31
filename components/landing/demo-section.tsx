import { ArrowRight, MessageSquare, BarChart3 } from "lucide-react";
import { SectionContainer } from "./section-container";
import Image from "next/image";

export function DemoSection() {
  return (
    <SectionContainer className="py-12 sm:py-20 bg-gray-900/30">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Veja na prática
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
          Do WhatsApp ao dashboard em tempo real
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* WhatsApp Side */}
        <div className="w-full lg:w-1/2">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">WhatsApp</h3>
                <p className="text-green-500 text-sm">Registre em segundos</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Example 1: Entrada */}
              <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-green-500">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-white text-sm font-medium">Você</p>
                  <span className="text-gray-500 text-xs">14:40</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Registrar nova entrada de 15000 com comissão
                </p>
                <div className="bg-gray-900 rounded-lg p-3 space-y-1">
                  <p className="text-green-400 text-xs font-medium">
                    ✅ ENTRADA confirmada
                  </p>
                  <p className="text-gray-300 text-sm">📝 Comissão</p>
                  <p className="text-white text-base font-semibold">
                    💰 R$ 15.000,00
                  </p>
                </div>
              </div>

              {/* Example 2: Saída */}
              <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-white text-sm font-medium">Você</p>
                  <span className="text-gray-500 text-xs">19:46</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Registrar saída de 500 para oficina
                </p>
                <div className="bg-gray-900 rounded-lg p-3 space-y-1">
                  <p className="text-red-400 text-xs font-medium">
                    ✅ SAÍDA confirmada
                  </p>
                  <p className="text-gray-300 text-sm">📝 Oficina</p>
                  <p className="text-white text-base font-semibold">
                    💰 R$ 500,00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Indicator */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center shadow-lg shadow-green-500/25 animate-pulse">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Mobile Arrow */}
        <div className="lg:hidden flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-green-600 to-blue-600 flex items-center justify-center shadow-lg shadow-green-500/25 rotate-90">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Dashboard Side */}
        <div className="w-full lg:w-1/2">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Dashboard</h3>
                <p className="text-blue-500 text-sm">
                  Atualizado em tempo real
                </p>
              </div>
            </div>

            {/* Mini Summary Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
                <p className="text-green-500 text-xs font-medium mb-1">
                  ENTRADAS
                </p>
                <p className="text-white text-lg font-bold">R$ 9.409,99</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-500 text-xs font-medium mb-1">SAÍDAS</p>
                <p className="text-white text-lg font-bold">R$ 0,00</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
                <p className="text-blue-500 text-xs font-medium mb-1">SALDO</p>
                <p className="text-white text-lg font-bold">R$ 9.409,99</p>
              </div>
            </div>

            {/* Chart visualization */}
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-3">
                Distribuição Financeira
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-green-500 to-green-600"></div>
                  </div>
                </div>
                <span className="text-green-500 font-semibold text-sm">
                  100%
                </span>
              </div>
              <div className="flex items-center justify-between mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-400">Entradas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-400">Saídas</span>
                </div>
              </div>
            </div>

            {/* Recent transaction */}
            <div className="mt-4 bg-gray-800/30 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-2">
                Última transação registrada
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium text-sm">Apostas</p>
                  <p className="text-gray-500 text-xs">30/01/2025, 23:40</p>
                </div>
                <span className="text-green-500 font-bold">+R$ 9.409,99</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="mt-12 text-center">
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          <span className="text-white font-medium">
            Instantâneo e automático.
          </span>{" "}
          Não precisa abrir apps, fazer login ou preencher formulários. Apenas
          uma mensagem e pronto!
        </p>
      </div>
    </SectionContainer>
  );
}
