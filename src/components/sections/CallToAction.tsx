import Link from "next/link";

export function CallToAction() {
  return (
    <section className="w-full py-24 md:py-32">
      <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to understand your users <span className="text-gradient">better?</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 md:text-xl mb-10 max-w-2xl mx-auto">
            Join companies that use autentic.ai to transform customer feedback into actionable product decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#demo" 
              className="luma-button luma-button-primary px-8 py-4 text-base rounded-[0.625rem]"
            >
              Start free trial
            </Link>
            <Link 
              href="#contact"
              className="luma-button luma-button-secondary px-8 py-4 text-base rounded-[0.625rem]"
            >
              Schedule a demo
            </Link>
          </div>
          
          <div className="mt-12 py-6 px-8 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-xl">
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Trusted by product teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {/* Placeholder for company logos - replace with actual logos later */}
              <div className="h-8 w-24 bg-slate-200/50 dark:bg-slate-700/50 rounded-md"></div>
              <div className="h-8 w-20 bg-slate-200/50 dark:bg-slate-700/50 rounded-md"></div>
              <div className="h-8 w-28 bg-slate-200/50 dark:bg-slate-700/50 rounded-md"></div>
              <div className="h-8 w-24 bg-slate-200/50 dark:bg-slate-700/50 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 