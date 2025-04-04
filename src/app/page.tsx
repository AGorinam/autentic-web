import { Hero } from "@/components/sections/Hero";
import { FeatureTabs } from "@/components/sections/FeatureTabs";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <div className="w-full overflow-hidden">
        <svg className="w-full h-16 -mt-1" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0L1440 0V50C1440 50 1252.94 100 720 100C187.06 100 0 50 0 50V0Z" fill="white" className="dark:fill-slate-950" />
        </svg>
      </div>
      <FeatureTabs />
      <div className="w-full overflow-hidden rotate-180 mt-16 md:mt-24">
        <svg className="w-full h-16 -mb-1" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0L1440 0V50C1440 50 1252.94 100 720 100C187.06 100 0 50 0 50V0Z" fill="white" className="dark:fill-slate-950" />
        </svg>
      </div>
      <CallToAction />
      <Footer />
    </main>
  );
}
