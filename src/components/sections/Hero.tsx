import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden gradient-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left column with text content */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
              Chat with your <span className="text-gradient">customer feedback</span><br />
              Discover what to build next
            </h1>
            <p className="text-slate-700 md:text-xl max-w-[720px] mx-auto lg:mx-0">
              autentic.ai helps Product teams uncover real user needs by turning scattered feedback into actionable insights — with source clips and full context, just a chat away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Link 
                href="#demo" 
                className="luma-button luma-button-primary px-8 py-4 text-base"
              >
                Start for free
              </Link>
              <Link 
                href="#video"
                className="luma-button luma-button-secondary px-8 py-4 text-base"
              >
                Watch video
              </Link>
            </div>
          </div>
          
          {/* Right column with the chat mockup */}
          <div className="lg:ml-auto flex items-center justify-center">
            <div className="relative w-full max-w-[500px] rounded-xl overflow-hidden border shadow-xl">
              <div className="bg-gray-50 p-4 border-b">
                <div className="h-2 w-24 bg-gray-200 rounded-full"></div>
              </div>
              <div className="bg-white p-6 space-y-6">
                {/* User query */}
                <div className="flex justify-end">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">What do users say about onboarding?</p>
                  </div>
                </div>
                
                {/* AI response with insight */}
                <div className="space-y-2 max-w-[80%]">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-800">
                      Users frequently mention that the onboarding process is too complex. 
                      Many find it difficult to set up their initial workflows without 
                      additional guidance. Consider adding interactive tutorials and reducing 
                      the number of required steps.
                    </p>
                  </div>
                  <button className="flex items-center text-xs text-blue-600 hover:text-blue-800">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1 h-3 w-3"
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                    Listen to original clip
                  </button>
                </div>
                
                {/* Input field mockup */}
                <div className="relative mt-6 border rounded-lg">
                  <input
                    type="text"
                    placeholder="Ask about your feedback..."
                    className="w-full p-3 pr-10 text-sm focus:outline-none rounded-lg"
                    disabled
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}