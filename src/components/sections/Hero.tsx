"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Switch } from "@/components/ui/switch";
import { Draggable } from "@/components/ui/draggable";
import { cn } from "@/lib/utils";

export function Hero() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [activePeriod, setActivePeriod] = useState("28D");
  const [chatVisible, setChatVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<{ top: number; left: number; right: number; bottom: number } | null>(null);
  
  // Calculate initial position based on viewport
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 50 });
  
  // Update bounds when window is resized
  useEffect(() => {
    const updateBounds = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        
        // Allow dragging beyond the top edge (negative values)
        setBounds({
          top: -150, // Allow dragging above the visible area
          left: isMobile ? -50 : -100,
          right: rect.width - (isMobile ? 0 : 100),
          bottom: rect.height - 100,
        });
      }
    };
    
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);
  
  useEffect(() => {
    const calculateInitialPosition = () => {
      // For mobile, center the chat horizontally
      if (window.innerWidth < 768) {
        const centerX = (window.innerWidth - 560) / 2;
        setInitialPosition({ x: Math.max(0, centerX), y: 50 });
      } else {
        // For larger screens, position it slightly to the right
        setInitialPosition({ x: 20, y: 50 });
      }
    };
    
    calculateInitialPosition();
    window.addEventListener('resize', calculateInitialPosition);
    return () => window.removeEventListener('resize', calculateInitialPosition);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  
  // Placeholders for the input field with explicit instructions to try it
  const placeholders = [
    "What users think about the new mobile app?",
    "What mobile features do users want most?",
    "What do enterprise customers think?",
    "What users think about the new sidebar?",
  ];
  
  return (
    <section ref={heroRef} className="w-full py-12 md:py-24 lg:py-32 overflow-hidden gradient-background relative">
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
          <div className="lg:ml-auto flex items-center justify-center relative h-[550px] w-full">
            {/* Draggable chat mockup */}
            {chatVisible && (
              <Draggable
                bounds={bounds}
                dragHandleSelector=".drag-handle"
                initialPosition={initialPosition}
                className="transition-opacity duration-500 opacity-100 w-full max-w-[560px]"
              >
                <div className="w-full rounded-xl overflow-hidden border shadow-xl bg-white">
                  {/* Top navigation bar - macOS style - make it work with draggable */}
                  <div className="bg-gray-50 p-3 border-b flex justify-between items-center drag-handle cursor-grab select-none hover:bg-gray-100 transition-colors">
                    <div className="flex space-x-2">
                      <div className="h-2.5 w-2.5 bg-red-400 rounded-full"></div>
                      <div className="h-2.5 w-2.5 bg-yellow-400 rounded-full"></div>
                      <div className="h-2.5 w-2.5 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-500 select-none">autentic.ai</div>
                    <div className="w-16 flex justify-end">
                      <div className="h-1.5 w-5 bg-gray-300 rounded mr-1 mt-1" aria-hidden="true" title="Drag to move"></div>
                    </div>
                  </div>
                  
                  <div className="flex h-[450px]">
                    {/* Sidebar with integrations */}
                    <div className={`border-r bg-gray-50 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-[50px]' : 'w-[230px]'}`}>
                      {/* Sidebar header with collapse toggle */}
                      <div className="p-2 border-b flex items-center justify-between">
                        {!sidebarCollapsed && <div className="text-xs font-medium text-gray-500">Active Integrations</div>}
                        <button 
                          className={cn(
                            "p-1 rounded-md hover:bg-gray-200 text-gray-500 cursor-pointer",
                            sidebarCollapsed ? "w-full flex justify-center" : ""
                          )}
                          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                          {sidebarCollapsed ? (
                            <PanelLeft className="h-4 w-4 text-gray-700" />
                          ) : (
                            <PanelLeftClose className="h-4 w-4 text-gray-700" />
                          )}
                        </button>
                      </div>
                      
                      {/* Sidebar content */}
                      <div className="overflow-y-auto p-2 space-y-2 flex-1">
                        {/* Time period filters */}
                        {!sidebarCollapsed && (
                          <div className="flex gap-1 mb-2">
                            <button 
                              onClick={() => setActivePeriod("7D")}
                              className={cn(
                                "text-xs border px-2 py-1 rounded-md transition-colors cursor-pointer", 
                                activePeriod === "7D" 
                                  ? "text-blue-600 font-medium border-blue-200 bg-blue-50" 
                                  : "bg-white hover:bg-gray-50"
                              )}
                            >
                              7D
                            </button>
                            <button 
                              onClick={() => setActivePeriod("28D")}
                              className={cn(
                                "text-xs border px-2 py-1 rounded-md transition-colors cursor-pointer", 
                                activePeriod === "28D" 
                                  ? "text-blue-600 font-medium border-blue-200 bg-blue-50" 
                                  : "bg-white hover:bg-gray-50"
                              )}
                            >
                              28D
                            </button>
                            <button 
                              onClick={() => setActivePeriod("90D")}
                              className={cn(
                                "text-xs border px-2 py-1 rounded-md transition-colors cursor-pointer", 
                                activePeriod === "90D" 
                                  ? "text-blue-600 font-medium border-blue-200 bg-blue-50" 
                                  : "bg-white hover:bg-gray-50"
                              )}
                            >
                              90D
                            </button>
                          </div>
                        )}
                        
                        {/* Integration items */}
                        <div className="space-y-2">
                          {/* Zendesk */}
                          <div className={`bg-white rounded-lg border border-gray-200 ${sidebarCollapsed ? 'p-1.5 flex justify-center' : 'p-3'}`}>
                            {sidebarCollapsed ? (
                              <img 
                                src="/images/integrations/zendesk-logo.png" 
                                alt="Zendesk" 
                                className="w-5 h-5 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyAyMUwyMSAzTTMgM0wyMSAyMSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=";
                                  target.classList.add("bg-black", "rounded-sm");
                                }}
                              />
                            ) : (
                              <>
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <img 
                                      src="/images/integrations/zendesk-logo.png" 
                                      alt="Zendesk" 
                                      className="w-6 h-6 object-contain"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyAyMUwyMSAzTTMgM0wyMSAyMSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=";
                                        target.classList.add("bg-black", "rounded-sm");
                                      }}
                                    />
                                    <div className="font-medium text-base">Zendesk</div>
                                  </div>
                                  <Switch defaultChecked />
                                </div>
                                <div className="flex items-center mt-1">
                                  <div className="h-2 w-2 bg-green-500 rounded-full mr-1.5"></div>
                                  <div className="text-xs text-green-500 font-medium">sincronized · 189 calls</div>
                                </div>
                                <div className="text-xs text-gray-500">Last sync: 02/03 · 12:37</div>
                              </>
                            )}
                          </div>
                          
                          {/* Gong */}
                          <div className={`bg-white rounded-lg border border-gray-200 ${sidebarCollapsed ? 'p-1.5 flex justify-center' : 'p-3'}`}>
                            {sidebarCollapsed ? (
                              <img 
                                src="/images/integrations/gong-logo.png" 
                                alt="Gong" 
                                className="w-5 h-5 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgN1YxMkwxNSAxNU0yMSAxMkMyMSAxNi45NzA2IDE2Ljk3MDYgMjEgMTIgMjFDNy4wMjk0NCAyMSAzIDE2Ljk3MDYgMyAxMkMzIDcuMDI5NDQgNy4wMjk0NCAzIDEyIDNDMTYuOTcwNiAzIDIxIDcuMDI5NDQgMjEgMTJaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==";
                                  target.classList.add("bg-purple-600", "rounded-sm");
                                }}
                              />
                            ) : (
                              <>
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <img 
                                      src="/images/integrations/gong-logo.png" 
                                      alt="Gong" 
                                      className="w-6 h-6 object-contain"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgN1YxMkwxNSAxNU0yMSAxMkMyMSAxNi45NzA2IDE2Ljk3MDYgMjEgMTIgMjFDNy4wMjk0NCAyMSAzIDE2Ljk3MDYgMyAxMkMzIDcuMDI5NDQgNy4wMjk0NCAzIDEyIDNDMTYuOTcwNiAzIDIxIDcuMDI5NDQgMjEgMTJaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==";
                                        target.classList.add("bg-purple-600", "rounded-sm");
                                      }}
                                    />
                                    <div className="font-medium text-xl leading-6">Gong</div>
                                  </div>
                                  <Switch defaultChecked />
                                </div>
                                <div className="flex items-center mt-1">
                                  <div className="h-2 w-2 bg-green-500 rounded-full mr-1.5"></div>
                                  <div className="text-xs text-green-500 font-medium">sincronized · 360 calls</div>
                                </div>
                                <div className="text-xs text-gray-500">Last sync: 01/04 · 11:23</div>
                              </>
                            )}
                          </div>
                          
                          {/* Intercom */}
                          <div className={`bg-white rounded-lg border border-gray-200 ${sidebarCollapsed ? 'p-1.5 flex justify-center' : 'p-3'}`}>
                            {sidebarCollapsed ? (
                              <img 
                                src="/images/integrations/intercom-logo.png" 
                                alt="Intercom" 
                                className="w-5 h-5 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCAxMGguMDFNMTIgMTBoLjAxTTE2IDEwaC4wMU05IDE2SDVhMiAyIDAgMDEtMi0yVjZhMiAyIDAgMDEyLTJoMTRhMiAyIDAgMDEyIDJ2OGEyIDIgMCAwMS0yIDJoLTVsLTUgNXYtNXoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZVdpZHRoPSIyIiBzdHJva2VMaW5lY2FwPSJyb3VuZCIgc3Ryb2tlTGluZWpvaW49InJvdW5kIi8+PC9zdmc+";
                                  target.classList.add("bg-blue-800", "rounded-sm");
                                }}
                              />
                            ) : (
                              <>
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <img 
                                      src="/images/integrations/intercom-logo.png" 
                                      alt="Intercom" 
                                      className="w-6 h-6 object-contain"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCAxMGguMDFNMTIgMTBoLjAxTTE2IDEwaC4wMU05IDE2SDVhMiAyIDAgMDEtMi0yVjZhMiAyIDAgMDEyLTJoMTRhMiAyIDAgMDEyIDJ2OGEyIDIgMCAwMS0yIDJoLTVsLTUgNXYtNXoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZVdpZHRoPSIyIiBzdHJva2VMaW5lY2FwPSJyb3VuZCIgc3Ryb2tlTGluZWpvaW49InJvdW5kIi8+PC9zdmc+";
                                        target.classList.add("bg-blue-800", "rounded-sm");
                                      }}
                                    />
                                    <div className="font-medium text-base">Intercom</div>
                                  </div>
                                  <Switch />
                                </div>
                                <div className="flex items-center mt-1">
                                  <div className="h-2 w-2 bg-gray-400 rounded-full mr-1.5"></div>
                                  <div className="text-xs text-gray-500">disconnected</div>
                                </div>
                                <div className="text-xs text-gray-500">Last sync: never</div>
                              </>
                            )}
                          </div>
                          
                          {/* Add Integration */}
                          <div className={`border border-dashed rounded-md cursor-pointer hover:bg-gray-50 ${sidebarCollapsed ? 'p-1.5 flex justify-center' : 'p-2 mt-2 flex justify-center items-center'}`}>
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
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Draggable>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}