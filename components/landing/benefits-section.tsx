import {
  Zap,
  MessageSquare,
  BarChart3,
  Eye,
  PieChart,
  Shield,
} from "lucide-react";
import { FeatureCard } from "./feature-card";
import { SectionContainer } from "./section-container";

export function BenefitsSection() {
  const benefits = [
    {
      icon: Zap,
      title: "Registro Instantâneo",
      description:
        "Registre suas transações em segundos, onde quer que esteja, sem abrir apps",
      iconColor: "text-yellow-500",
    },
    {
      icon: MessageSquare,
      title: "Confirmação Automática",
      description:
        "Receba confirmação imediata pelo WhatsApp de cada transação registrada",
      iconColor: "text-green-500",
    },
    {
      icon: BarChart3,
      title: "Dashboard Sempre Atualizado",
      description:
        "Veja seus dados financeiros em tempo real com gráficos profissionais",
      iconColor: "text-blue-500",
    },
    {
      icon: Eye,
      title: "Visualização Clara",
      description:
        "Entradas e saídas organizadas para você entender seus gastos facilmente",
      iconColor: "text-purple-500",
    },
    {
      icon: PieChart,
      title: "Gráficos Intuitivos",
      description:
        "Análises visuais que mostram para onde seu dinheiro está indo",
      iconColor: "text-pink-500",
    },
    {
      icon: Shield,
      title: "Controle Total",
      description:
        "Suas finanças organizadas e seguras, acessíveis de qualquer lugar",
      iconColor: "text-indigo-500",
    },
  ];

  return (
    <SectionContainer className="py-12 sm:py-20" id="beneficios">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Por que usar nosso sistema?
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
          Simplicidade e controle total das suas finanças
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {benefits.map((benefit, index) => (
          <FeatureCard
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            iconColor={benefit.iconColor}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
