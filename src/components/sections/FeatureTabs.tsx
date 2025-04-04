"use client";

import { Tabs } from "@/components/ui/tabs";

export function FeatureTabs() {
  const tabs = [
    {
      title: "Integrations",
      value: "integrations",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-indigo-600 to-violet-600">
          <div className="flex flex-col h-full">
            <h3 className="text-2xl md:text-4xl mb-4">Connect Your Feedback Sources</h3>
            <p className="text-base md:text-lg font-normal mb-6">
              Import customer feedback from multiple channels into one unified workspace. 
              Easily connect with Intercom, Zendesk, customer interviews, and more.
            </p>
            {/* Placeholder for integration image */}
            <div className="mt-auto h-[60%] w-full relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"></div>
              {/* Display a colored placeholder div if image isn't available */}
              <div className="w-full h-full rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <p className="text-lg font-normal">Integration Dashboard Preview</p>
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
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-600 to-indigo-600">
          <div className="flex flex-col h-full">
            <h3 className="text-2xl md:text-4xl mb-4">Ask Questions, Get Insights</h3>
            <p className="text-base md:text-lg font-normal mb-6">
              Chat with your customer feedback in natural language. Ask specific questions and get 
              instant insights backed by real user quotes and source contexts.
            </p>
            {/* Placeholder for chat image */}
            <div className="mt-auto h-[60%] w-full relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"></div>
              {/* Display a colored placeholder div if image isn't available */}
              <div className="w-full h-full rounded-xl bg-blue-500/20 flex items-center justify-center">
                <p className="text-lg font-normal">Chat Interface Preview</p>
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
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-pink-600">
          <div className="flex flex-col h-full">
            <h3 className="text-2xl md:text-4xl mb-4">Discover What Users Really Want</h3>
            <p className="text-base md:text-lg font-normal mb-6">
              Uncover patterns, track sentiment over time, and identify the most requested features
              with AI-powered analytics that go beyond basic categorization.
            </p>
            {/* Placeholder for insights image */}
            <div className="mt-auto h-[60%] w-full relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"></div>
              {/* Display a colored placeholder div if image isn't available */}
              <div className="w-full h-full rounded-xl bg-purple-500/20 flex items-center justify-center">
                <p className="text-lg font-normal">Analytics Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      ),
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All your feedback in <span className="text-gradient">one place</span>
          </h2>
          <p className="text-slate-700 md:text-lg max-w-[720px] mx-auto">
            Transform scattered feedback into a searchable knowledge base that your whole team can explore.
          </p>
        </div>
        <div className="h-[30rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start">
          <Tabs 
            tabs={tabs} 
            activeTabClassName="bg-indigo-100 dark:bg-indigo-950/30"
            tabClassName="text-sm md:text-base font-medium"
          />
        </div>
      </div>
    </section>
  );
} 