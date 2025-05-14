"use client"

import { useState, FormEvent, useEffect, useRef } from "react"
import { Paperclip, Mic, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import { cn } from "@/lib/utils"
import Image from "next/image"

type Message = {
  id: number;
  content: string;
  sender: "user" | "ai";
  sources?: MessageSource[];
  showOptions?: boolean;
};

type MessageSource = {
  name: string;
  role: string;
  type: string;
  quote: string;
  hasAudio?: boolean;
  audioUrl?: string;
  timestamp?: {
    start: number;
    end: number;
  };
};

export function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! I'm autentic.ai. What would you like to know about your users?",
      sender: "ai",
    },
  ]);

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState<number | null>(null)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const chatBodyRef = useRef<HTMLDivElement>(null)
  
  // Product questions that the user can select
  const productQuestions = [
    { id: "q1", boldText: "What features do", regularText: "users request most often?" },
    { id: "q2", boldText: "What pain points do", regularText: "users experience?" },
    { id: "q3", boldText: "How do users rate", regularText: "our onboarding experience?" },
    { id: "q4", boldText: "What's the user sentiment", regularText: "about our latest release?" },
  ];

  // Prepared responses with sources
  const questionResponses: Record<string, { content: string, sources: MessageSource[] }> = {
    "q1": {
      content: "Based on feedback across multiple channels, users most frequently request improved integration capabilities, particularly with CRM tools and project management software.",
      sources: [
        {
          name: "Emma R.",
          role: "Enterprise Customer",
          type: "Interview",
          quote: "We need better Salesforce integration. Our team spends too much time switching between tools.",
          hasAudio: true
        },
        {
          name: "David K.",
          role: "Product Manager",
          type: "Support Ticket",
          quote: "Is there a roadmap for adding Asana integration? This would save us hours of manual work every week."
        }
      ]
    },
    "q2": {
      content: "The most common pain points reported by users involve the search functionality and notification system. Many find the search results inaccurate and notifications too frequent or irrelevant.",
      sources: [
        {
          name: "Michael T.",
          role: "Customer",
          type: "Gong Call",
          quote: "The search is practically useless. I can never find what I need without scrolling through everything.",
          hasAudio: true
        },
        {
          name: "Sarah L.",
          role: "User",
          type: "Feedback Survey",
          quote: "Too many notifications! I end up turning them all off because I can't customize which ones I receive."
        }
      ]
    },
    "q3": {
      content: "Our onboarding currently scores an average of 6.2/10. Users appreciate the tutorial videos but find that the process has too many steps and lacks clear guidance for advanced features.",
      sources: [
        {
          name: "Chris P.",
          role: "New User",
          type: "NPS Survey",
          quote: "The videos were helpful, but it took me over an hour to set everything up. Could be more streamlined."
        },
        {
          name: "Jennifer M.",
          role: "Team Lead",
          type: "Customer Success Call",
          quote: "My team struggled with setting up the advanced workflows. We needed to contact support three times.",
          hasAudio: true
        }
      ]
    },
    "q4": {
      content: "Sentiment about our latest release (v2.4) is mixed. The new dashboard is well-received, but users report performance issues and confusion about the changed navigation.",
      sources: [
        {
          name: "Alex W.",
          role: "Power User",
          type: "Twitter",
          quote: "Love the new dashboard layout! Much easier to see all my metrics at once. Great improvement!"
        },
        {
          name: "Patricia N.",
          role: "Customer",
          type: "Support Ticket",
          quote: "Since the update, the app takes twice as long to load data. Also, where did you move the settings menu?",
          hasAudio: true
        }
      ]
    }
  };

  // Scroll to bottom when messages change or loading state changes
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
      }
    }
    
    // Attempt to scroll immediately
    scrollToBottom()
    
    // And also after a short delay to ensure content has rendered
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [messages, isLoading])

  // Custom function to handle adding messages with proper scroll behavior
  const addMessage = (newMessage: Message) => {
    setMessages(prev => [...prev, newMessage])
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      content: input,
      sender: "user",
    }
    
    addMessage(userMessage)
    
    const userInput = input.toLowerCase()
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let responseContent = "I'm not sure how to respond to that. Would you like to know about user feedback, pain points, onboarding experience, or recent release sentiment?"
      
      // Check if input matches any of our product questions
      for (const question of productQuestions) {
        const fullQuestion = `${question.boldText} ${question.regularText}`.toLowerCase()
        if (userInput.includes(fullQuestion) || 
            (question.id === "q1" && (userInput.includes("feature") || userInput.includes("request"))) ||
            (question.id === "q2" && (userInput.includes("pain") || userInput.includes("problem"))) ||
            (question.id === "q3" && (userInput.includes("onboard") || userInput.includes("start"))) ||
            (question.id === "q4" && (userInput.includes("sentiment") || userInput.includes("latest") || userInput.includes("release")))
           ) {
          responseContent = questionResponses[question.id].content
          
          // Add response with matching content
          addMessage({
            id: Date.now(),
            content: responseContent,
            sender: "ai",
            sources: questionResponses[question.id].sources.map(source => ({
              ...source,
              audioUrl: source.hasAudio ? 
                source.type === "Gong Call" ? `/audio/calls/Michael-t.mp3` :
                source.type === "Interview" ? `/audio/calls/Emma-r.mp3` :
                source.type === "Customer Success Call" ? `/audio/calls/Jennifer-m.mp3` :
                source.type === "Support Ticket" ? `/audio/calls/Patricia-n.mp3` :
                `/audio/calls/michael-t.mp3` : undefined,
              timestamp: source.hasAudio ? { start: 0, end: 30 } : undefined,
            })),
            showOptions: false
          })
          
          // Keep loading state active for the follow-up message
          // setIsLoading(false) - Don't set loading to false yet
          
          // Then add a follow-up message after a short delay
          setTimeout(() => {
            addMessage({
              id: Date.now(),
              content: "Is there anything else you'd like to know about your users?",
              sender: "ai",
              showOptions: true
            })
            
            // Only set loading to false after second message
            setIsLoading(false)
          }, 2000)
          
          return
        }
      }
      
      // Add generic response if no matching question
      addMessage({
        id: Date.now(),
        content: responseContent,
        sender: "ai",
        showOptions: true
      })
      
      setIsLoading(false)
    }, 1000)
  }

  // Handle email submission
  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    
    // Here you would typically send the email to your backend/CRM
    console.log('New lead email:', email);
    
    setEmailSubmitted(true);
    
    // Add a thank you message
    addMessage({
      id: Date.now(),
      content: `Thank you for your email! We'll keep you updated on our latest features and improvements.`,
      sender: "ai",
    });
    
    // Hide the form after submission
    setTimeout(() => {
      setShowEmailCapture(false);
    }, 500);
  };

  // Handle clicking one of the preset questions
  const handleQuestionClick = (questionId: string) => {
    // Find the question by ID
    const question = productQuestions.find(q => q.id === questionId)
    if (!question) return
    
    // Add the question as a user message with combined text
    addMessage({
      id: Date.now(),
      content: `${question.boldText} ${question.regularText}`,
      sender: "user",
    })
    
    setIsLoading(true)
    
    // Manually trigger scroll after adding the message
    setTimeout(() => {
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
      }
    }, 50)
    
    // Simulate AI response with delay
    setTimeout(() => {
      const response = questionResponses[questionId]
      
      addMessage({
        id: Date.now(),
        content: response.content,
        sender: "ai",
        sources: response.sources.map(source => ({
          ...source,
          audioUrl: source.hasAudio ? 
            source.type === "Gong Call" ? `/audio/calls/michael-t.mp3` :
            source.type === "Interview" ? `/audio/calls/Emma-r.mp3` :
            source.type === "Customer Success Call" ? `/audio/calls/Jennifer-m.mp3` :
            source.type === "Support Ticket" ? `/audio/calls/Patricia-n.mp3` :
            `/audio/calls/michael-t.mp3` : undefined,
          timestamp: source.hasAudio ? { start: 0, end: 30 } : undefined,
        })),
        showOptions: false
      })
      
      // Keep loading state active
      // setIsLoading(false) - Don't set loading to false yet
      
      // Add a follow-up message after a short delay
      setTimeout(() => {
        addMessage({
          id: Date.now(),
          content: "Is there anything else you'd like to know about your users?",
          sender: "ai",
          showOptions: true
        })
        
        // Only set loading to false after second message
        setIsLoading(false);
        
        // Show email capture after user has interacted with at least 2 questions
        // We count interactions by checking messages with user sender
        const userMessages = messages.filter(msg => msg.sender === "user");
        if (userMessages.length >= 1 && !emailSubmitted && !showEmailCapture) {
          setTimeout(() => {
            setShowEmailCapture(true);
          }, 1000);
        }
      }, 2000)
    }, 1000)
  }

  // Handle key press for the input field
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) {
        handleSubmit(e as unknown as FormEvent)
      }
    }
  }

  // Clear previous useEffect from ChatMessageList that might be causing conflicts
  useEffect(() => {
    // This effect runs once when component mounts
    // No need to return cleanup function as we're not adding event listeners
  }, [])

  // Handle audio playback
  const handlePlayAudio = async (source: MessageSource, messageId: number) => {
    if (!source.audioUrl) return;
    
    console.log('Attempting to play audio:', source.audioUrl);

    // Create a new audio element for each playback
    const audio = new Audio(source.audioUrl);
    console.log('Created new audio element');

    if (isPlaying === messageId) {
      // Stop playing
      console.log('Stopping audio playback');
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(null);
    } else {
      // Start playing
      try {
        // Set up error handling before attempting to play
        audio.onerror = () => {
          console.error('Audio playback error details:', { 
            code: audio.error?.code,
            message: audio.error?.message,
            src: audio.src
          });
          setIsPlaying(null);
        };
        
        // Set up completion handling
        audio.onended = () => {
          console.log('Audio playback completed');
          setIsPlaying(null);
        };

        if (source.timestamp) {
          audio.currentTime = source.timestamp.start;
        }
        
        // Store the audio element in the ref
        audioRef.current = audio;
        
        console.log('Starting audio playback');
        await audio.play();
        setIsPlaying(messageId);

        // Handle timestamp end if specified
        if (source.timestamp) {
          const duration = source.timestamp.end - source.timestamp.start;
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current = null;
              setIsPlaying(null);
            }
          }, duration * 1000);
        }
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsPlaying(null);
      }
    }
  };

  // Update the audio cleanup useEffect
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <ExpandableChatBody ref={chatBodyRef} className="flex-grow overflow-auto">
        <ChatMessageList className="min-h-0">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src={
                  message.sender === "user"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                }
                fallback={message.sender === "user" ? "US" : "AI"}
              />
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
              >
                {message.content}
                
                {message.showOptions && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {productQuestions.map((question) => (
                        <button
                          key={question.id}
                          className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                          onClick={() => handleQuestionClick(question.id)}
                        >
                          <div className="text-sm text-gray-800">
                            <span className="font-bold">{question.boldText}</span>
                            <span className="font-normal"> {question.regularText}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {message.sender === "ai" && message.sources && (
                  <div className="mt-4 pt-2 space-y-4 border-t border-gray-100">
                    <div className="text-sm font-medium text-gray-700">Sources:</div>
                    
                    {message.sources.map((source, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 flex flex-col">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn(
                            "h-7 w-7 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden",
                            source.type === "Gong Call" ? "bg-purple-100" :
                            source.type === "Interview" ? "bg-blue-100" :
                            source.type === "Support Ticket" ? "bg-orange-100" :
                            source.type === "Twitter" ? "bg-sky-100" :
                            source.type === "Feedback Survey" ? "bg-orange-100" :
                            source.type === "NPS Survey" ? "bg-green-100" :
                            source.type === "Customer Success Call" ? "bg-blue-100" :
                            "bg-gray-100"
                          )}>
                            {source.type === "Gong Call" ? (
                              <Image src="/images/integrations/gong.png" alt="Gong" width={20} height={20} className="object-contain" />
                            ) : source.type === "Support Ticket" ? (
                              <Image src="/images/integrations/zendesk.svg" alt="Zendesk" width={16} height={16} className="object-contain" />
                            ) : source.type === "Customer Success Call" ? (
                              <Image src="/images/integrations/zoom.svg" alt="Zoom" width={16} height={16} className="object-contain" />
                            ) : source.type === "Interview" ? (
                              <Image src="/images/integrations/teams.svg" alt="Teams" width={16} height={16} className="object-contain" />
                            ) : source.type === "Twitter" ? (
                              <svg className="w-4 h-4 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                              </svg>
                            ) : source.type === "Feedback Survey" || source.type === "NPS Survey" ? (
                              <Image src="/images/integrations/intercom.svg" alt="Intercom" width={16} height={16} className="object-contain" />
                            ) : (
                              <svg className="w-3 h-3 text-orange-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900">{source.name}</span>
                              <span className="mx-1.5 text-gray-500">•</span>
                              <span className="text-sm text-gray-600">{source.role}</span>
                            </div>
                            <div className="text-xs text-gray-500">{source.type}</div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-700 italic my-1">&quot;{source.quote}&quot;</div>
                        
                        {source.hasAudio && (
                          <div className="mt-2">
                            <div 
                              className="bg-white rounded-full border border-gray-200 shadow-sm flex items-center py-1.5 px-2 w-[190px] cursor-pointer"
                              onClick={() => handlePlayAudio(source, message.id)}
                            >
                              <button 
                                className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm cursor-pointer"
                                aria-label={isPlaying === message.id ? "Pause" : "Play"}
                              >
                                {isPlaying === message.id ? (
                                  <svg className="w-3.5 h-3.5 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="4" width="4" height="16" rx="1" />
                                    <rect x="14" y="4" width="4" height="16" rx="1" />
                                  </svg>
                                ) : (
                                  <svg className="w-3.5 h-3.5 text-gray-800 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M5 3l14 9-14 9V3z" />
                                  </svg>
                                )}
                              </button>
                              
                              <span className="text-sm text-gray-700 ml-3 flex-shrink-0">
                                {isPlaying === message.id ? '0:05' : '0:30'}
                              </span>
                              
                              <div className="ml-2 flex-1">
                                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-gray-400 rounded-full" style={{ width: isPlaying === message.id ? '50%' : '0%' }}></div>
                                </div>
                              </div>
                              
                              <button 
                                className="ml-3 text-gray-500 hover:text-gray-700 flex-shrink-0 cursor-pointer"
                                aria-label="Volume"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                fallback="AI"
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}

          {messages.length === 1 && (
            <div className="mt-6 mb-4 px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {productQuestions.map((question) => (
                  <button
                    key={question.id}
                    className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                    onClick={() => handleQuestionClick(question.id)}
                  >
                    <div className="text-sm text-gray-800">
                      <span className="font-bold">{question.boldText}</span>
                      <span className="font-normal"> {question.regularText}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {showEmailCapture && !emailSubmitted && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                fallback="AI"
              />
              <ChatBubbleMessage variant="received">
                <div>
                  <p className="mb-3">Want to get more insights like these? Enter your email to receive our weekly user research newsletter!</p>
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="h-9 shrink-0 bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Subscribe
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 mt-2">We respect your privacy and will never share your email.</p>
                </div>
              </ChatBubbleMessage>
            </ChatBubble>
          )}
          
          {/* Add extra space at the bottom */}
          <div className="h-4" />
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter className="shrink-0 border-t">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1 mx-3 mb-3 mt-3"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type message..."
            className="min-h-10 resize-none rounded-lg bg-background border-0 p-2 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-2 pt-0 justify-between">
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="h-8 w-8 cursor-pointer"
              >
                <Paperclip className="size-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="h-8 w-8 cursor-pointer"
              >
                <Mic className="size-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 h-8 cursor-pointer border-gray-200 hover:bg-gray-50"
              >
                <div className="h-2 w-2 rounded-full bg-green-500 source-pulse"></div>
                <span className="text-gray-600 font-medium">2 sources</span>
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 h-8 cursor-pointer hover:bg-primary/90 transition-colors">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </div>
        </form>
      </ExpandableChatFooter>
    </div>
  )
} 