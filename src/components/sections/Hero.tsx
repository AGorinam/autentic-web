"use client";

import Link from "next/link";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function Hero() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  
  // Placeholders for the input field with explicit instructions to try it
  const placeholders = [
    "Type a question about user feedback... (try it!)",
    "Ask me about mobile app feedback...",
    "What features do users want most? (try typing here)",
    "Ask: What do enterprise customers think?",
    "Try asking about user pain points...",
  ];
  
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden gradient-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left column with text content */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
              Chat with your <span className="text-gradient">customer feedback</span><br />
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
            <div className="relative w-full max-w-[560px] rounded-xl overflow-hidden border shadow-xl bg-white">
              {/* Top navigation bar - removed "Autentic Dashboard" text */}
              <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                <div className="flex space-x-2">
                  <div className="h-2.5 w-2.5 bg-red-400 rounded-full"></div>
                  <div className="h-2.5 w-2.5 bg-yellow-400 rounded-full"></div>
                  <div className="h-2.5 w-2.5 bg-green-400 rounded-full"></div>
                </div>
                <div className="w-16"></div> {/* Spacer to balance the layout */}
              </div>
              
              <div className="flex h-[450px]">
                {/* Sidebar with integrations */}
                <div className={`border-r bg-gray-50 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-[50px]' : 'w-[180px]'}`}>
                  {/* Sidebar header with collapse toggle */}
                  <div className="p-2 border-b flex items-center justify-between">
                    {!sidebarCollapsed && <div className="text-xs font-medium text-gray-500">Active Integrations</div>}
                    <button 
                      className="p-1 rounded-md hover:bg-gray-200 text-gray-500"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-gray-700"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="9" y1="3" x2="9" y2="21" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Sidebar content */}
                  <div className="overflow-y-auto p-2 space-y-2 flex-1">
                    {/* Time period filters */}
                    {!sidebarCollapsed && (
                      <div className="flex gap-1 mb-2">
                        <div className="text-xs bg-white border px-2 py-1 rounded-md">7D</div>
                        <div className="text-xs bg-white border px-2 py-1 rounded-md text-blue-600 font-medium border-blue-200 bg-blue-50">28D</div>
                        <div className="text-xs bg-white border px-2 py-1 rounded-md">90D</div>
                      </div>
                    )}
                    
                    {/* Integration items */}
                    <div className="space-y-2">
                      {/* Zendesk */}
                      <div className={`bg-white rounded-md border ${sidebarCollapsed ? 'p-1.5 flex justify-center' : 'p-2'}`}>
                        {sidebarCollapsed ? (
                          <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 21L21 3M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-4 h-4 mr-1.5 bg-black rounded-sm flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 21L21 3M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                  </svg>
                                </div>
                                <div className="font-medium text-sm">Zendesk</div>
                              </div>
                              <div className="relative w-8 h-4 bg-gray-200 rounded-full">
                                <div className="absolute right-0 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                              </div>
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="h-2 w-2 bg-green-400 rounded-full mr-1.5"></div>
                              <div className="text-[10px] text-gray-500">synchronized · 189 calls</div>
                            </div>
                            <div className="text-[10px] text-gray-400">Last sync: 02/03 · 12:37</div>
                          </>
                        )}
                      </div>
                      
                      {/* Gong */}
                      <div className={`bg-white rounded-md border ${sidebarCollapsed ? 'p-1.5 flex justify-center' : 'p-2'}`}>
                        {sidebarCollapsed ? (
                          <div className="w-5 h-5 bg-purple-600 rounded-sm flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 7V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-4 h-4 mr-1.5 bg-purple-600 rounded-sm flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 7V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <div className="font-medium text-sm">Gong</div>
                              </div>
                              <div className="relative w-8 h-4 bg-gray-200 rounded-full">
                                <div className="absolute right-0 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                              </div>
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="h-2 w-2 bg-green-400 rounded-full mr-1.5"></div>
                              <div className="text-[10px] text-gray-500">synchronized · 360 calls</div>
                            </div>
                            <div className="text-[10px] text-gray-400">Last sync: 01/04 · 14:23</div>
                          </>
                        )}
                      </div>
                      
                      {/* Intercom */}
                      <div className={`bg-white rounded-md border ${sidebarCollapsed ? 'p-1.5 flex justify-center' : 'p-2'}`}>
                        {sidebarCollapsed ? (
                          <div className="w-5 h-5 bg-blue-800 rounded-sm flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-4 h-4 mr-1.5 bg-blue-800 rounded-sm flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <div className="font-medium text-sm">Intercom</div>
                              </div>
                              <div className="relative w-8 h-4 bg-gray-200 rounded-full">
                                <div className="absolute left-0 top-0 w-4 h-4 bg-white border border-gray-300 rounded-full"></div>
                              </div>
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="h-2 w-2 bg-green-400 rounded-full mr-1.5"></div>
                              <div className="text-[10px] text-gray-500">synchronized · 360 calls</div>
                            </div>
                            <div className="text-[10px] text-gray-400">Last sync: 30/03 · 14:00</div>
                          </>
                        )}
                      </div>
                      
                      {/* Add Integration */}
                      <div className={`border border-dashed rounded-md ${sidebarCollapsed ? 'p-1.5 flex justify-center' : 'p-2 mt-2 flex justify-center items-center'}`}>
                        <div className={`${sidebarCollapsed ? '' : 'text-xs'} text-gray-500 flex items-center`}>
                          <svg className={`${sidebarCollapsed ? 'w-3 h-3' : 'w-3 h-3 mr-1'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          {!sidebarCollapsed && <span>Add Integration</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main chat area */}
                <div className="flex-1 flex flex-col">                  
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {/* User query */}
                    <div className="flex justify-end">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">What do users say about onboarding?</p>
                      </div>
                    </div>
                    
                    {/* AI response with insight */}
                    <div className="space-y-3 max-w-[90%]">
                      <div className="bg-blue-50 rounded-lg p-3.5">
                        <p className="text-sm text-gray-800">
                          Users frequently mention that the onboarding process is too complex. 
                          Many find it difficult to set up their initial workflows without 
                          additional guidance. Consider adding interactive tutorials and reducing 
                          the number of required steps.
                        </p>
                      </div>
                      
                      {/* Sources section */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="text-xs font-medium text-gray-600 mb-2">Sources</div>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <div className="bg-purple-100 rounded-md p-1 mr-2">
                              <svg className="w-3 h-3 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15.5H7.5C6.10444 15.5 5.40665 15.5 4.83886 15.6722C3.56045 16.06 2.56004 17.0605 2.17224 18.3389C2 18.9067 2 19.6044 2 21M19 21V15M16 18H22M14.5 7.5C14.5 9.98528 12.4853 12 10 12C7.51472 12 5.5 9.98528 5.5 7.5C5.5 5.01472 7.51472 3 10 3C12.4853 3 14.5 5.01472 14.5 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div>
                              <div className="flex items-center">
                                <div className="text-xs font-medium">Marco P. (Customer)</div>
                                <div className="bg-purple-100 text-purple-600 text-[10px] px-1.5 rounded ml-2">Gong Call</div>
                              </div>
                              <p className="text-xs text-gray-600 mt-0.5">
                                "I spent nearly an hour trying to configure the workflow. The setup process wasn't intuitive at all."
                              </p>
                              <button className="flex items-center text-[10px] text-blue-600 hover:text-blue-800 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                  <line x1="12" y1="19" x2="12" y2="23" />
                                  <line x1="8" y1="23" x2="16" y2="23" />
                                </svg>
                                Listen to clip
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-blue-100 rounded-md p-1 mr-2">
                              <svg className="w-3 h-3 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 9.99979H22M9 3.99979V5.99979M15 3.99979V5.99979M7.8 3.99979H16.2C17.8802 3.99979 18.7202 3.99979 19.362 4.32679C19.9265 4.61479 20.3848 5.07299 20.6728 5.63759C21 6.27959 21 7.11959 21 8.79979V16.1998C21 17.8798 21 18.7198 20.6728 19.3618C20.3848 19.9264 19.9265 20.3848 19.362 20.6726C18.7202 20.9998 17.8802 20.9998 16.2 20.9998H7.8C6.11984 20.9998 5.27976 20.9998 4.63803 20.6726C4.07354 20.3848 3.6151 19.9264 3.32725 19.3618C3 18.7198 3 17.8798 3 16.1998V8.79979C3 7.11959 3 6.27959 3.32725 5.63759C3.6151 5.07299 4.07354 4.61479 4.63803 4.32679C5.27976 3.99979 6.11984 3.99979 7.8 3.99979Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div>
                              <div className="flex items-center">
                                <div className="text-xs font-medium">Sarah J. (Support)</div>
                                <div className="bg-blue-100 text-blue-600 text-[10px] px-1.5 rounded ml-2">Zendesk Ticket</div>
                              </div>
                              <p className="text-xs text-gray-600 mt-0.5">
                                "Could you please provide more documentation on the initial setup? I'm struggling to understand how to configure my workspace."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Input area */}
                  <div className="p-3 border-t">
                    <PlaceholdersAndVanishInput
                      placeholders={placeholders}
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}