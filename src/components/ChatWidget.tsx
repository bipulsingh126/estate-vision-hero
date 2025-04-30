import React, { useState, useRef, useEffect } from "react";
import * as FramerMotion from "framer-motion";
import { 
  MessageSquare, 
  X, 
  Send, 
  User, 
  Bot, 
  Loader2, 
  Phone, 
  Image as ImageIcon, 
  MapPin, 
  Video, 
  Smile,
  ThumbsUp,
  ChevronDown,
  Search,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StatusBadge } from "@/components/ui/badge";

const { motion } = FramerMotion;

// Predefined chatbot responses
const botResponses = [
  {
    trigger: ["hello", "hi", "hey", "greetings"],
    response: "Hello! Welcome to EstateVision. How can I assist you today with your real estate needs?",
  },
  {
    trigger: ["property", "properties", "house", "apartment", "flat"],
    response: "We have a wide range of properties available across India. Would you like to search for properties in a specific city or explore by features?",
  },
  {
    trigger: ["price", "cost", "budget", "pricing", "expensive"],
    response: "Our properties range from affordable apartments to luxury homes. Can you share your budget range so I can help find properties that match your requirements?",
  },
  {
    trigger: ["location", "area", "city", "where"],
    response: "EstateVision has properties in major cities across India including Mumbai, Delhi, Bangalore, Chennai, and Hyderabad. Which city are you interested in?",
  },
  {
    trigger: ["buy", "purchase", "invest"],
    response: "Thinking of buying a property? Great! Our expert consultants can guide you through the entire process. Would you like to speak with a real estate advisor?",
  },
  {
    trigger: ["sell", "selling"],
    response: "Looking to sell your property? We can help you get the best value. Would you like to schedule a property valuation with one of our experts?",
  },
  {
    trigger: ["rent", "lease", "rental"],
    response: "We have many properties available for rent. Are you looking for a residential or commercial property?",
  },
  {
    trigger: ["tour", "visit", "see", "look", "virtual"],
    response: "We offer both in-person and virtual tours of our properties. Would you like to schedule a viewing or check out our 3D virtual tours?",
  },
  {
    trigger: ["contact", "phone", "call", "email", "reach"],
    response: "You can reach us at 1800-123-4567 or email contact@estatevision.in. Would you like me to connect you with a customer service representative?",
  },
  {
    trigger: ["agent", "advisor", "consultant", "expert", "realtor"],
    response: "Our experienced real estate agents can provide personalized assistance. Would you like me to arrange a call with one of our property experts?",
  },
  {
    trigger: ["help", "support", "assistance"],
    response: "I'm here to help! Feel free to ask me about property listings, pricing, locations, or any other real estate queries.",
  },
];

// Function to find a matching bot response
const findBotResponse = (message: string): string => {
  const lowercaseMessage = message.toLowerCase();
  
  for (const item of botResponses) {
    if (item.trigger.some(keyword => lowercaseMessage.includes(keyword))) {
      return item.response;
    }
  }
  
  return "Thank you for your message. A customer service representative will help you with this query shortly. Is there anything else I can assist you with?";
};

// Predefined agent information
const agents = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    status: "online",
    position: "Senior Property Advisor",
  },
  {
    id: 2,
    name: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    status: "online",
    position: "Investment Specialist",
  },
  {
    id: 3,
    name: "Ananya Patel",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    status: "away",
    position: "Residential Consultant",
  },
];

// Types for our messages
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
  isTyping?: boolean;
  agentId?: number;
  read?: boolean;
  liked?: boolean;
}

// Quick response suggestions
const quickResponses = [
  "Tell me about your properties in Mumbai",
  "How do I schedule a viewing?",
  "What's the process for buying a property?",
  "Do you have properties with a sea view?"
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'chatbot' | 'live'>('chatbot');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm EstateVision AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      read: true
    }
  ]);
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [agentConnecting, setAgentConnecting] = useState(false);
  const [agentConnected, setAgentConnected] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Filter messages by tab and agent
  const filteredMessages = React.useMemo(() => {
    if (currentTab === 'chatbot') {
      return messages.filter(msg => msg.sender !== 'agent');
    } else if (currentTab === 'live' && selectedAgent) {
      return messages.filter(msg => 
        (msg.sender === 'agent' && msg.agentId === selectedAgent) || 
        (msg.sender === 'user' && (msg.agentId === selectedAgent || msg.agentId === undefined))
      );
    }
    return [];
  }, [messages, currentTab, selectedAgent]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      ...(currentTab === 'live' && selectedAgent ? { agentId: selectedAgent } : {})
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setShowSuggestions(false);
    
    // Handle response based on current tab
    if (currentTab === 'chatbot') {
      // Simulate typing indicator
      const typingMessage: Message = {
        id: `typing-${Date.now()}`,
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, typingMessage]);
      
      // Remove typing indicator and add actual response after a delay
      setTimeout(() => {
        setMessages(prev => {
          const filteredMessages = prev.filter(msg => !msg.isTyping);
          return [
            ...filteredMessages,
            {
              id: Date.now().toString(),
              text: findBotResponse(input),
              sender: 'bot',
              timestamp: new Date()
            }
          ];
        });
      }, 1500);
    } else if (currentTab === 'live' && agentConnected && selectedAgent) {
      // Simulate agent typing indicator
      const typingMessage: Message = {
        id: `typing-${Date.now()}`,
        text: '',
        sender: 'agent',
        timestamp: new Date(),
        isTyping: true,
        agentId: selectedAgent
      };
      
      setMessages(prev => [...prev, typingMessage]);
      
      // Simulate agent response after a delay
      setTimeout(() => {
        setMessages(prev => {
          const filteredMessages = prev.filter(msg => !msg.isTyping);
          return [
            ...filteredMessages,
            {
              id: Date.now().toString(),
              text: "Thank you for your message. I'm reviewing your query and will provide the information you need shortly.",
              sender: 'agent',
              timestamp: new Date(),
              agentId: selectedAgent
            }
          ];
        });
      }, 2500);
    }
  };

  // Handle quick response selection
  const handleQuickResponse = (response: string) => {
    setInput(response);
    handleSendMessage();
  };

  // Handle keypress (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Connect with a live agent
  const handleConnectAgent = (agentId: number) => {
    setSelectedAgent(agentId);
    setAgentConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setAgentConnecting(false);
      setAgentConnected(true);
      
      const agent = agents.find(a => a.id === agentId);
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `Hello, I'm ${agent?.name}, a ${agent?.position} at EstateVision. How may I assist you today?`,
          sender: 'agent',
          timestamp: new Date(),
          agentId: agentId
        }
      ]);
    }, 2000);
  };

  // Like a message
  const handleLikeMessage = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, liked: !msg.liked } 
          : msg
      )
    );
  };

  // Trigger file upload dialog
  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  // Format time for messages
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Widget animations
  const widgetVariants = {
    open: { 
      width: 380,
      height: 580,
      borderRadius: 20
    },
    closed: { 
      width: 60,
      height: 60,
      borderRadius: 30
    }
  };

  // Filter agents by search
  const filteredAgents = searchQuery 
    ? agents.filter(agent => 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.position.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : agents;

  // Clear input
  const handleClearInput = () => {
    setInput("");
  };

  // Handle cancel button for live chat
  const handleCancelLiveChat = () => {
    if (selectedAgent) {
      // Confirm before canceling an active chat
      if (agentConnected && messages.some(msg => msg.sender === 'user' && msg.agentId === selectedAgent)) {
        if (window.confirm("Are you sure you want to end this chat session?")) {
          setSelectedAgent(null);
          setAgentConnected(false);
        }
      } else {
        setSelectedAgent(null);
        setAgentConnected(false);
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col overflow-hidden border dark:border-gray-800"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={widgetVariants}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        style={{ maxHeight: isOpen ? '80vh' : '60px' }}
      >
        {isOpen ? (
          <>
            {/* Header */}
            <div className="bg-estate-navy text-white py-4 px-5 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-lg font-semibold">Estate Chat</span>
                <StatusBadge status="online" className="ml-2" />
              </div>
              <div className="flex items-center gap-2">
                {currentTab === 'live' && selectedAgent && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-estate-navy/50 h-8 px-2"
                    onClick={handleCancelLiveChat}
                  >
                    <span className="mr-1">End Chat</span>
                    <XCircle size={16} />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-estate-navy/50"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue={currentTab} onValueChange={(v) => setCurrentTab(v as 'chatbot' | 'live')} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-2 mx-4 mt-3">
                <TabsTrigger value="chatbot" className="flex items-center gap-1">
                  <Bot size={14} />
                  <span>AI Assistant</span>
                </TabsTrigger>
                <TabsTrigger value="live" className="flex items-center gap-1">
                  <User size={14} />
                  <span>Live Chat</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chatbot" className="flex-1 flex flex-col px-4 pt-3 pb-4 max-h-full">
                <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin custom-scrollbar" style={{ maxHeight: 'calc(100% - 120px)' }}>
                  <div className="space-y-4">
                    {filteredMessages.map((message) => (
                      <motion.div 
                        key={message.id} 
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {message.sender === 'bot' && !message.isTyping && (
                          <Avatar className="mr-2 mt-1 flex-shrink-0">
                            <AvatarFallback className="bg-estate-gold/20 text-estate-gold">
                              <Bot size={16} />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className="flex flex-col">
                          <div 
                            className={`max-w-[95%] p-3.5 rounded-2xl ${
                              message.sender === 'user' 
                                ? 'bg-estate-navy text-white rounded-tr-none' 
                                : message.isTyping 
                                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                            }`}
                          >
                            {message.isTyping ? (
                              <div className="flex space-x-1 items-center justify-center h-6">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                              </div>
                            ) : (
                              <p className="text-sm">{message.text}</p>
                            )}
                          </div>
                          
                          {!message.isTyping && (
                            <div className={`flex items-center mt-1 text-xs text-gray-500 gap-2
                              ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <span>{formatMessageTime(message.timestamp)}</span>
                              
                              {message.sender === 'bot' && (
                                <button 
                                  onClick={() => handleLikeMessage(message.id)}
                                  className={`focus:outline-none ${message.liked ? 'text-estate-gold' : 'hover:text-estate-gold/80'}`}
                                >
                                  <ThumbsUp size={12} />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {message.sender === 'user' && (
                          <Avatar className="ml-2 mt-1 flex-shrink-0">
                            <AvatarFallback className="bg-estate-gold/20 text-estate-gold">
                              <User size={16} />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                
                {showSuggestions && filteredMessages.length <= 2 && (
                  <motion.div 
                    className="mb-4 mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                  >
                    <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickResponses.map((response, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          size="sm" 
                          className="text-xs py-1 h-auto"
                          onClick={() => handleQuickResponse(response)}
                        >
                          {response}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <div className="relative">
                  <Textarea 
                    placeholder="Type your message here..."
                    className="min-h-[80px] resize-none pr-10 scrollbar-thin rounded-xl border-gray-200 dark:border-gray-700 focus:border-estate-gold"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <div className="absolute right-3 bottom-3 flex items-center gap-1">
                    {input && (
                      <Button 
                        size="icon" 
                        variant="ghost"
                        className="h-8 w-8 rounded-full text-gray-500 hover:text-red-500"
                        onClick={handleClearInput}
                      >
                        <X size={18} />
                      </Button>
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            className="h-8 w-8 rounded-full text-gray-500 hover:text-estate-gold"
                          >
                            <Smile size={18} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Add emoji</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <Button 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-estate-gold hover:bg-estate-gold/90 text-black"
                      onClick={handleSendMessage}
                      disabled={!input.trim()}
                    >
                      <Send size={15} />
                    </Button>
                  </div>
                </div>
                
                <motion.div 
                  className="flex justify-center mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs text-gray-500">Powered by EstateVision AI</p>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="live" className="flex-1 flex flex-col px-4 pt-3 pb-4 max-h-full">
                {!selectedAgent ? (
                  <div className="flex-1 flex flex-col">
                    <div className="text-center mb-4">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">Chat with a Property Expert</h3>
                      <p className="text-sm text-gray-500">Choose an agent to start chatting</p>
                    </div>
                    
                    <div className="relative mb-4">
                      <Input
                        placeholder="Search for an agent..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10"
                      />
                      {searchQuery ? (
                        <button 
                          className="absolute right-10 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 hover:text-gray-700"
                          onClick={() => setSearchQuery('')}
                        >
                          <X size={16} />
                        </button>
                      ) : null}
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                    
                    <div className="space-y-4 flex-1 overflow-y-auto pr-1 scrollbar-thin custom-scrollbar" style={{ maxHeight: 'calc(100% - 150px)' }}>
                      {filteredAgents.length > 0 ? (
                        filteredAgents.map((agent) => (
                          <motion.div 
                            key={agent.id}
                            whileHover={{ scale: 1.02 }}
                            className="border dark:border-gray-700 rounded-xl p-4 flex items-center hover:border-estate-gold cursor-pointer transition-colors"
                            onClick={() => handleConnectAgent(agent.id)}
                          >
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarImage src={agent.avatar} alt={agent.name} />
                              <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <h4 className="font-medium">{agent.name}</h4>
                                <StatusBadge 
                                  status={agent.status as 'online' | 'away'} 
                                  className="ml-2"
                                />
                              </div>
                              <p className="text-sm text-gray-500">{agent.position}</p>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No agents found matching your search</p>
                          <Button 
                            variant="ghost" 
                            className="mt-2"
                            onClick={() => setSearchQuery('')}
                          >
                            Clear search
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-auto flex justify-center pt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 text-gray-600"
                        onClick={() => setCurrentTab('chatbot')}
                      >
                        <Bot size={16} />
                        <span>Return to AI Assistant</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {agentConnecting ? (
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <Loader2 size={32} className="text-estate-gold animate-spin mb-4" />
                        <p className="text-gray-600 dark:text-gray-300">Connecting to agent...</p>
                        <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-6"
                          onClick={() => {
                            setSelectedAgent(null);
                            setAgentConnecting(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 mb-4 flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={agents.find(a => a.id === selectedAgent)?.avatar} />
                            <AvatarFallback>{agents.find(a => a.id === selectedAgent)?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium text-sm">{agents.find(a => a.id === selectedAgent)?.name}</p>
                              <StatusBadge status="online" className="ml-2" size="sm" />
                            </div>
                            <p className="text-xs text-gray-500">{agents.find(a => a.id === selectedAgent)?.position}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto h-8 w-8 text-gray-500 hover:text-red-500"
                            onClick={handleCancelLiveChat}
                            title="End chat session"
                          >
                            <XCircle size={18} />
                          </Button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin custom-scrollbar" style={{ maxHeight: 'calc(100% - 150px)' }}>
                          <div className="space-y-4">
                            {filteredMessages.map((message) => (
                              <motion.div 
                                key={message.id} 
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {message.sender === 'agent' && !message.isTyping && (
                                  <Avatar className="mr-2 mt-1 flex-shrink-0">
                                    <AvatarImage src={agents.find(a => a.id === message.agentId)?.avatar} />
                                    <AvatarFallback>{agents.find(a => a.id === message.agentId)?.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                )}
                                
                                <div className="flex flex-col">
                                  <div 
                                    className={`max-w-[95%] p-3.5 rounded-2xl ${
                                      message.sender === 'user' 
                                        ? 'bg-estate-navy text-white rounded-tr-none' 
                                        : message.isTyping 
                                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                                    }`}
                                  >
                                    {message.isTyping ? (
                                      <div className="flex space-x-1 items-center justify-center h-6">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                                      </div>
                                    ) : (
                                      <p className="text-sm">{message.text}</p>
                                    )}
                                  </div>
                                  
                                  {!message.isTyping && (
                                    <div className={`flex items-center mt-1 text-xs text-gray-500
                                      ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                      <span>{formatMessageTime(message.timestamp)}</span>
                                    </div>
                                  )}
                                </div>
                                
                                {message.sender === 'user' && (
                                  <Avatar className="ml-2 mt-1 flex-shrink-0">
                                    <AvatarFallback className="bg-estate-gold/20 text-estate-gold">
                                      <User size={16} />
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-around mb-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-estate-gold">
                                    <Phone size={18} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Call agent</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-estate-gold" onClick={handleAttachmentClick}>
                                    <ImageIcon size={18} />
                                    <input type="file" ref={fileInputRef} className="hidden" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Send image</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-estate-gold">
                                    <MapPin size={18} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Share location</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-estate-gold">
                                    <Video size={18} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Video call</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          
                          <div className="relative">
                            <Input 
                              placeholder="Type your message here..."
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onKeyDown={handleKeyPress}
                              className="pr-10 border-gray-200 dark:border-gray-700 focus:border-estate-gold"
                            />
                            {input && (
                              <button 
                                className="absolute right-10 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 hover:text-gray-700"
                                onClick={handleClearInput}
                              >
                                <X size={16} />
                              </button>
                            )}
                            <Button 
                              size="icon" 
                              className="absolute right-1 top-1 h-8 w-8 rounded-full bg-estate-gold hover:bg-estate-gold/90 text-black"
                              onClick={handleSendMessage}
                              disabled={!input.trim()}
                            >
                              <Send size={15} />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <Button 
            className="w-full h-full p-0 rounded-full bg-estate-gold hover:bg-estate-gold/90 text-black"
            onClick={() => setIsOpen(true)}
          >
            <MessageSquare size={24} />
          </Button>
        )}
      </motion.div>
    </>
  );
};

export default ChatWidget; 