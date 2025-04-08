import { Hero } from "@/components/sections/Hero";
import { FeatureTabs } from "@/components/sections/FeatureTabs";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/sections/Footer";
import { ComparisonCard } from "@/components/ComparisonCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Hero />
      <div className="w-full overflow-hidden -mt-32">
        <svg className="w-full h-20" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0L1440 0V50C1440 50 1252.94 100 720 100C187.06 100 0 50 0 50V0Z" fill="white" />
        </svg>
      </div>
      <FeatureTabs />
      <section className="w-full py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-50/30 dark:bg-indigo-950/10 z-0"></div>
        <div className="absolute inset-0 aurora-bg z-0"></div>
        <ComparisonCard className="relative z-10" />
      </section>
      <CallToAction />
      <Footer />
    </main>
  );
}
