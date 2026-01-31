import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor = "text-green-500",
}: FeatureCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300 hover:transform hover:-translate-y-1">
      <div className={`${iconColor} mb-4`}>
        <Icon className="w-12 h-12 sm:w-16 sm:h-16" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
