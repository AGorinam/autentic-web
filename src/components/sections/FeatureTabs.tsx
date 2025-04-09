"use client";

import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";

export function FeatureTabs() {
  const tabs = [
    {
      title: "Integrations",
      value: "integrations",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-[0.825rem] p-6 md:p-10 md:pt-6 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col h-full">
            <h3 className="text-xl md:text-4xl mb-2">Connect Your Feedback Sources</h3>
            <p className="text-sm md:text-lg font-normal mb-4 md:mb-8">
              Import customer feedback from multiple channels into one unified workspace. 
              Easily connect with Intercom, Zendesk, customer interviews, and more.
            </p>
            {/* Feature image container */}
            <div className="mt-2 md:mt-4 h-[72%] md:h-[80%] w-full relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-[0.625rem]"></div>
              <div className="relative w-full h-full rounded-[0.625rem] overflow-hidden">
                <Image
                  src="/images/features/integrations-dashboard.png"
                  alt="Integration Dashboard showing multiple feedback sources connected"
                  fill
                  className="object-cover object-top scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Chat",
      value: "chat",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-[0.825rem] p-6 md:p-10 md:pt-6 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col h-full">
            <h3 className="text-xl md:text-4xl mb-2">Ask Questions, Get Insights</h3>
            <p className="text-sm md:text-lg font-normal mb-4 md:mb-8">
              Chat with your customer feedback in natural language. Ask specific questions and get 
              instant insights backed by real user quotes and source contexts.
            </p>
            {/* Feature image container */}
            <div className="mt-2 md:mt-4 h-[72%] md:h-[80%] w-full relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-[0.625rem]"></div>
              <div className="relative w-full h-full rounded-[0.625rem] overflow-hidden">
                <Image
                  src="/images/features/chat-interface.png"
                  alt="AI chat interface showing customer feedback analysis"
                  fill
                  className="object-cover object-top scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Insights",
      value: "insights",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-[0.825rem] p-6 md:p-10 md:pt-6 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col h-full">
            <h3 className="text-xl md:text-4xl mb-2">Discover What Users Really Want</h3>
            <p className="text-sm md:text-lg font-normal mb-4 md:mb-8">
              Uncover patterns, track sentiment over time, and identify the most requested features
              with AI-powered analytics that go beyond basic categorization.
            </p>
            {/* Feature image container */}
            <div className="mt-2 md:mt-4 h-[72%] md:h-[80%] w-full relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-[0.625rem]"></div>
              <div className="relative w-full h-full rounded-[0.625rem] overflow-hidden">
                <Image
                  src="/images/features/insights-dashboard.png"
                  alt="Analytics dashboard showing user feedback insights and trends"
                  fill
                  className="object-cover object-top scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      ),
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 pb-24 md:pb-48 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All your feedback in <span className="text-gradient">one place</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 md:text-lg max-w-[720px] mx-auto">
            Transform scattered feedback into a searchable knowledge base that your whole team can explore.
          </p>
        </div>
        <div className="h-[40rem] md:h-[42rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start">
          <Tabs 
            tabs={tabs} 
            activeTabClassName="bg-indigo-100/70 dark:bg-indigo-950/40 shadow-sm"
            tabClassName="text-sm md:text-base font-medium transition-all duration-200"
            contentClassName="mt-24 md:mt-28"
          />
        </div>
      </div>
    </section>
  );
}