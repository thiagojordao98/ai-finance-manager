import { LandingHero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { DemoSection } from "@/components/landing/demo-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { FinalCTA } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <LandingHero />
      <HowItWorks />
      <DemoSection />
      <BenefitsSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
}
