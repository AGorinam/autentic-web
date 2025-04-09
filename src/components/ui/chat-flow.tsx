"use client";

import { useState, useRef, useEffect } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

type Message = {
  id: string;
  type: "user" | "bot";
  content: string;
  source?: {
    name: string;
    role: string;
    type: string;
    quote: string;
    hasAudio?: boolean;
  }[];
};

type QuestionOption = {
  id: string;
  text: string;
};

export function ChatFlow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Hi there! I'm autentic.ai. What would you like to know about your users?",
    },
  ]);
  
  const [showOptions, setShowOptions] = useState(true);
  const [emailMode, setEmailMode] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [askingForMore, setAskingForMore] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  // Call scrollToBottom whenever messages change
  useEffect(() => {
    // Allow the DOM to update before scrolling
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [messages]);

  // Placeholders for the input field with instructions
  const emailPlaceholders = [
    "Enter your email to see a demo...",
    "Type your email here for a demo...",
    "Get a demo by entering your email...",
    "Your work email to access the demo..."
  ];

  // Placeholders for after email submission
  const followupPlaceholders = [
    "Type 'yes' to explore more options or 'no' to finish",
    "Yes to see more insights, no to end conversation",
    "Would you like to try another question? (yes/no)",
    "Interested in more insights? Type yes or no",
  ];

  const productQuestions: QuestionOption[] = [
    { id: "q1", text: "What features do users request most often?" },
    { id: "q2", text: "What pain points do users experience?" },
    { id: "q3", text: "How do users rate our onboarding experience?" },
    { id: "q4", text: "What's the user sentiment about our latest release?" },
  ];

  const questionResponses: Record<string, Message> = {
    "q1": {
      id: "r1",
      type: "bot",
      content: "Based on feedback across multiple channels, users most frequently request improved integration capabilities, particularly with CRM tools and project management software.",
      source: [
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
      id: "r2",
      type: "bot",
      content: "The most common pain points reported by users involve the search functionality and notification system. Many find the search results inaccurate and notifications too frequent or irrelevant.",
      source: [
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
      id: "r3",
      type: "bot",
      content: "Our onboarding currently scores an average of 6.2/10. Users appreciate the tutorial videos but find that the process has too many steps and lacks clear guidance for advanced features.",
      source: [
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
      id: "r4",
      type: "bot",
      content: "Sentiment about our latest release (v2.4) is mixed. The new dashboard is well-received, but users report performance issues and confusion about the changed navigation.",
      source: [
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (emailMode) {
      if (!email.trim() || !email.includes('@')) return;
      
      // Add user email as a message
      const userEmailMessage: Message = {
        id: `user-email-${Date.now()}`,
        type: "user",
        content: email
      };
      
      setMessages(prevMessages => [...prevMessages, userEmailMessage]);
      scrollToBottom();
      setEmailMode(false);
      
      // Thank you message
      setTimeout(() => {
        const thankYouMessage: Message = {
          id: `thank-you-${Date.now()}`,
          type: "bot",
          content: "Thanks! We'll send you a demo link shortly. Would you like to try another option?"
        };
        setMessages(prevMessages => [...prevMessages, thankYouMessage]);
        scrollToBottom();
        setEmailSubmitted(true);
        setAskingForMore(true);
      }, 800);
    } else if (emailSubmitted && askingForMore) {
      // Handle yes/no response for trying another option
      if (!e.currentTarget.querySelector('input')?.value.trim()) return;
      
      const inputElement = e.currentTarget.querySelector('input') as HTMLInputElement;
      const userResponse = inputElement.value.trim().toLowerCase();
      
      const responseMessage: Message = {
        id: `response-${Date.now()}`,
        type: "user",
        content: inputElement.value
      };
      
      setMessages(prevMessages => [...prevMessages, responseMessage]);
      scrollToBottom();
      inputElement.value = '';
      
      setTimeout(() => {
        if (userResponse === 'yes' || userResponse === 'y') {
          // If user wants to try another option
          const moreOptionsMessage: Message = {
            id: `more-options-${Date.now()}`,
            type: "bot",
            content: "Great! What else would you like to know about your users?"
          };
          setMessages(prevMessages => [...prevMessages, moreOptionsMessage]);
          scrollToBottom();
          setAskingForMore(false);
          setEmailSubmitted(false);
          setShowOptions(true);
        } else {
          // If user doesn't want to try another option
          const endConversationMessage: Message = {
            id: `end-convo-${Date.now()}`,
            type: "bot",
            content: "Thank you for your interest in autentic.ai! We'll be in touch with you soon about the demo."
          };
          setMessages(prevMessages => [...prevMessages, endConversationMessage]);
          scrollToBottom();
          setConversationEnded(true);
          
          // Reset the whole conversation after 5 seconds
          setTimeout(() => {
            setMessages([{
              id: "welcome",
              type: "bot",
              content: "Hi there! I'm autentic.ai. What would you like to know about your users?",
            }]);
            scrollToBottom();
            setShowOptions(true);
            setEmailMode(false);
            setEmail("");
            setEmailSubmitted(false);
            setAskingForMore(false);
            setConversationEnded(false);
          }, 5000);
        }
      }, 800);
    }
  };

  const handleQuestionSelect = (question: QuestionOption) => {
    // Add user question
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: question.text
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    scrollToBottom();
    setShowOptions(false);
    
    // Add bot response after a short delay
    setTimeout(() => {
      const botResponse = questionResponses[question.id];
      setMessages(prevMessages => [...prevMessages, botResponse]);
      scrollToBottom();
      
      // After the response, prompt for email
      setTimeout(() => {
        const emailPrompt: Message = {
          id: `email-prompt-${Date.now()}`,
          type: "bot",
          content: "Would you like to see a demo of how autentic can help you gather and analyze this kind of user feedback? Enter your email to get started."
        };
        setMessages(prevMessages => [...prevMessages, emailPrompt]);
        scrollToBottom();
        setEmailMode(true);
      }, 1000);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] ${
              message.type === "user" 
                ? "bg-gray-100 hover:bg-gray-200" 
                : "bg-blue-50 hover:bg-blue-100"
              } rounded-[0.625rem] p-3 transition-colors duration-200`}
            >
              <p className="text-sm text-gray-800">{message.content}</p>
              
              {/* Sources section */}
              {message.source && (
                <div className="mt-3 bg-gray-50 rounded-[0.625rem] p-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all duration-200">
                  <div className="text-xs font-medium text-gray-800 mb-2">Sources</div>
                  <div className="space-y-2">
                    {message.source.map((source, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className={`${
                          source.type === "Interview" || source.type === "Gong Call" 
                            ? "bg-purple-100" 
                            : source.type === "Support Ticket" || source.type === "Customer Success Call"
                            ? "bg-blue-100"
                            : "bg-green-100"
                          } rounded-[0.425rem] p-1 mr-2 flex-shrink-0`}
                        >
                          <svg className={`w-3 h-3 ${
                            source.type === "Interview" || source.type === "Gong Call" 
                              ? "text-purple-600" 
                              : source.type === "Support Ticket" || source.type === "Customer Success Call"
                              ? "text-blue-600"
                              : "text-green-600"
                            }`} 
                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                          >
                            {source.type === "Interview" || source.type === "Gong Call" ? (
                              <path d="M12 15.5H7.5C6.10444 15.5 5.40665 15.5 4.83886 15.6722C3.56045 16.06 2.56004 17.0605 2.17224 18.3389C2 18.9067 2 19.6044 2 21M19 21V15M16 18H22M14.5 7.5C14.5 9.98528 12.4853 12 10 12C7.51472 12 5.5 9.98528 5.5 7.5C5.5 5.01472 7.51472 3 10 3C12.4853 3 14.5 5.01472 14.5 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            ) : source.type === "Support Ticket" || source.type === "Customer Success Call" ? (
                              <path d="M2 9.99979H22M9 3.99979V5.99979M15 3.99979V5.99979M7.8 3.99979H16.2C17.8802 3.99979 18.7202 3.99979 19.362 4.32679C19.9265 4.61479 20.3848 5.07299 20.6728 5.63759C21 6.27959 21 7.11959 21 8.79979V16.1998C21 17.8798 21 18.7198 20.6728 19.3618C20.3848 19.9264 19.9265 20.3848 19.362 20.6726C18.7202 20.9998 17.8802 20.9998 16.2 20.9998H7.8C6.11984 20.9998 5.27976 20.9998 4.63803 20.6726C4.07354 20.3848 3.6151 19.9264 3.32725 19.3618C3 18.7198 3 17.8798 3 16.1998V8.79979C3 7.11959 3 6.27959 3.32725 5.63759C3.6151 5.07299 4.07354 4.61479 4.63803 4.32679C5.27976 3.99979 6.11984 3.99979 7.8 3.99979Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            ) : (
                              <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center flex-wrap">
                            <div className="text-xs font-medium text-gray-800 mr-2">{source.name} ({source.role})</div>
                            <div className={`${
                              source.type === "Interview" || source.type === "Gong Call" 
                                ? "bg-purple-100 text-purple-600" 
                                : source.type === "Support Ticket" || source.type === "Customer Success Call"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-green-100 text-green-600"
                              } text-[10px] px-1.5 rounded-[0.325rem]`}
                            >
                              {source.type}
                            </div>
                          </div>
                          <p className="text-xs text-gray-700 mt-0.5">
                            &quot;{source.quote}&quot;
                          </p>
                          {source.hasAudio && (
                            <button className="flex items-center text-[10px] text-blue-600 hover:text-blue-800 mt-1 cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" y1="19" x2="12" y2="23" />
                                <line x1="8" y1="23" x2="16" y2="23" />
                              </svg>
                              Listen to clip
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 pb-8 border-t bg-white w-full">
        {showOptions ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1">
            {productQuestions.map((question, index) => (
              <button
                key={question.id}
                className={`group bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-[0.625rem] text-sm font-medium text-left transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-[1.02] flex justify-between items-center ${
                  index === 0 
                    ? "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-purple-200" 
                    : index === 1
                    ? "hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:border-blue-200"
                    : index === 2
                    ? "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:border-teal-200"
                    : "hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:border-orange-200"
                }`}
                onClick={() => handleQuestionSelect(question)}
              >
                <span>{question.text}</span>
                <svg 
                  className={`w-4 h-4 ml-2 flex-shrink-0 text-gray-500 ${
                    index === 0 
                      ? "group-hover:text-purple-500" 
                      : index === 1
                      ? "group-hover:text-blue-500"
                      : index === 2
                      ? "group-hover:text-teal-500"
                      : "group-hover:text-orange-500"
                  }`}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M9 18L15 12L9 6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        ) : emailMode ? (
          <PlaceholdersAndVanishInput
            placeholders={emailPlaceholders}
            onChange={handleInputChange}
            onSubmit={handleInputSubmit}
            className="w-full rounded-[0.625rem] shadow-sm hover:shadow transition-all duration-200 mb-5"
          />
        ) : emailSubmitted && askingForMore ? (
          <PlaceholdersAndVanishInput
            placeholders={followupPlaceholders}
            onChange={() => {}}
            onSubmit={handleInputSubmit}
            className="w-full rounded-[0.625rem] shadow-sm hover:shadow transition-all duration-200 mb-5"
          />
        ) : conversationEnded ? (
          <div className="text-sm text-center text-gray-500 py-2">
            Conversation ended. New chat will start in a few seconds...
          </div>
        ) : null}
      </div>
    </div>
  );
} 