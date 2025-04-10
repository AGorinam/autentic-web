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

type Message = {
  id: number;
  content: string;
  sender: "user" | "ai";
};

type MessageSource = {
  name: string;
  role: string;
  type: string;
  quote: string;
  hasAudio?: boolean;
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
  const chatBodyRef = useRef<HTMLDivElement>(null)
  
  // Product questions that the user can select
  const productQuestions = [
    { id: "q1", text: "What features do users request most often?" },
    { id: "q2", text: "What pain points do users experience?" },
    { id: "q3", text: "How do users rate our onboarding experience?" },
    { id: "q4", text: "What's the user sentiment about our latest release?" },
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
          quote: "We need better Salesforce integration. Our team spends too much time switching between tools."
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
          quote: "My team struggled with setting up the advanced workflows. We needed to contact support three times."
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
          quote: "Since the update, the app takes twice as long to load data. Also, where did you move the settings menu?"
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
        if (userInput.includes(question.text.toLowerCase()) || 
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
          })
          
          // Then add a follow-up message after a short delay
          setTimeout(() => {
            addMessage({
              id: Date.now(),
              content: "Is there anything else you'd like to know about your users?",
              sender: "ai",
            })
          }, 1000)
          
          setIsLoading(false)
          return
        }
      }
      
      // Add generic response if no matching question
      addMessage({
        id: Date.now(),
        content: responseContent,
        sender: "ai",
      })
      
      setIsLoading(false)
    }, 1000)
  }

  // Handle clicking one of the preset questions
  const handleQuestionClick = (questionId: string) => {
    // Find the question by ID
    const question = productQuestions.find(q => q.id === questionId)
    if (!question) return
    
    // Add the question as a user message
    addMessage({
      id: Date.now(),
      content: question.text,
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
      })
      
      // Add a follow-up message after a short delay
      setTimeout(() => {
        addMessage({
          id: Date.now(),
          content: "Is there anything else you'd like to know about your users?",
          sender: "ai",
        })
      }, 1000)
      
      setIsLoading(false)
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
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
              {productQuestions.map((question) => (
                <Button
                  key={question.id}
                  variant="outline"
                  className="mr-2 mb-2 text-left justify-start h-auto py-2 px-3 cursor-pointer"
                  onClick={() => handleQuestionClick(question.id)}
                >
                  {question.text}
                </Button>
              ))}
            </div>
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
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
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