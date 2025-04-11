"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function Integrations() {
  // Logo images for the integration grid
  const integrationLogos = [
    { name: "Google Drive", src: "/images/integrations/gong.png", alt: "Gond" },
    { name: "Zoom", src: "/images/integrations/zoom.svg", alt: "Zoom logo" },
    { name: "Slack", src: "/images/integrations/slack.svg", alt: "Slack logo" },
    { name: "Microsoft Teams", src: "/images/integrations/teams.svg", alt: "Microsoft Teams logo" },
    { name: "Notion", src: "/images/integrations/notion.svg", alt: "Notion logo" },
    { name: "Atlassian", src: "/images/integrations/atlassian.svg", alt: "Atlassian logo" },
    { name: "Trello", src: "/images/integrations/trello.svg", alt: "Trello logo" },
    { name: "Hubspot", src: "/images/integrations/hubspot.svg", alt: "Hubspot logo" },
    { name: "Zendesk", src: "/images/integrations/zendesk.svg", alt: "Zendesk logo" },
    { name: "Intercom", src: "/images/integrations/intercom.svg", alt: "Intercom logo" },
    { name: "Figma", src: "/images/integrations/figma.svg", alt: "Figma logo" },
    { name: "Linear", src: "/images/integrations/linear.svg", alt: "Linear logo" },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-50/30 dark:bg-indigo-950/10 z-0"></div>
      <div className="absolute inset-0 aurora-bg z-0"></div>
      <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <div className="mb-4">
            <Badge>Integrations</Badge>
          </div>
          <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
            Integrates with <br className="sm:hidden" />
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">your tools</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 md:text-lg max-w-[720px] mx-auto">
            Integrate autentic.ai with your team&apos;s stack and create a powerful customer insights hub that fits seamlessly with the way you work.
          </p>
        </div>

        {/* Mobile scroll container */}
        <div className="relative">
          <div className="overflow-x-auto pb-6 no-scrollbar md:overflow-visible">
            {/* Integration logos grid */}
            <div className="grid grid-flow-col md:grid-flow-row auto-cols-max md:auto-cols-auto gap-4 md:gap-4 md:grid-cols-3 lg:grid-cols-6 pl-0 pr-4 md:pr-0 md:min-w-0">
              {integrationLogos.map((logo, index) => (
                <div 
                  key={index}
                  className="w-[150px] h-[150px] md:w-auto md:h-auto md:aspect-square bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl flex items-center justify-center p-4 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-sm transition-all"
                >
                  <div className="relative w-12 h-12">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom CSS for scrollbar */}
        <style jsx global>{`
          @media (max-width: 768px) {
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
} 