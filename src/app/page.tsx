import { Hero } from "@/components/sections/Hero";
import { Integrations } from "@/components/sections/Integrations";
import { FeatureHighlights } from "@/components/features/FeatureHighlights";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full">
        <Hero />
        <FeatureHighlights />
        <section className="w-full py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-50/30 dark:bg-indigo-950/10 z-0"></div>
          <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto relative z-10">
            <Integrations />
          </div>
        </section>
        <CallToAction />
        <Footer />
      </div>
    </main>
  );
}
