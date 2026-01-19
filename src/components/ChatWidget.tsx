import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Trash2 } from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const systemPrompt =
    "Answer as you are the ht-techsolutuins AI assitant and the company is offering a main product SAAS named HT NEXUS AI. It's an AI logistic managment platform which has several pricing options. the site is https://ht-techsolutions.com";

  const [messages, setMessages] = useState([
    { role: "system", content: systemPrompt },
    {
      role: "assistant",
      content:
        "👋 Welcome to HT-NEXUS AI Support! How can I help you optimize your supply chain today?",
    },
  ]);
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to bottom smoothly whenever messages or typing state changes
    if (bottomRef.current) {
      try {
        bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      } catch (e) {
        // fallback
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      }
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await api.post("/ai/generate", {
        messages: [...messages, userMessage],
      });

      if (response.data.status === "success") {
        const aiResponse = response.data.data.choices[0].message;
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        const msg = response?.data?.message || "AI did not return a response.";
        toast({ variant: "destructive", title: "AI Error", description: msg });
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't get a response. Please try again.",
          },
        ]);
      }
    } catch (error: any) {
      console.error("AI generation failed:", error);
      const msg =
        error?.response?.data?.message || "An unexpected error occurred.";
      toast({ variant: "destructive", title: "AI Error", description: msg });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className='absolute bottom-16 right-0 w-80 glass-dark rounded-3xl shadow-2xl overflow-hidden mb-4 border-cyber-primary/20'
          >
            {/* Header */}
            <div className='bg-gradient-to-r from-accent to-cyber-primary p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Sparkles className='w-5 h-5 text-white' />
                  <span className='font-semibold text-white'>
                    HT-NEXUS Support
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => {
                      // preserve system prompt and initial assistant message
                      setMessages([
                        { role: "system", content: systemPrompt },
                        {
                          role: "assistant",
                          content:
                            "👋 Welcome to HT-NEXUS AI Support! How can I help you optimize your supply chain today?",
                        },
                      ]);
                      toast({ title: "Chat cleared" });
                    }}
                    className='text-white/80 hover:text-white mr-2'
                    aria-label='Clear chat'
                  >
                    <Trash2 className='w-5 h-5' />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className='text-white/80 hover:text-white'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesRef}
              className='p-4 h-64 overflow-y-auto space-y-4 custom-scrollbar'
            >
              {messages
                .filter((m) => m.role !== "system")
                .map((msg, i) => (
                  <motion.div
                    key={`${msg.role}-${i}-${String(msg.content).slice(0, 20)}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-4 rounded-2xl max-w-[85%] text-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-accent to-cyber-primary text-white rounded-tr-none shadow-lg shadow-accent/20"
                          : "glass text-foreground rounded-tl-none border-cyber-primary/10"
                      }`}
                    >
                      <p className='whitespace-pre-wrap'>{msg.content}</p>
                    </div>
                  </motion.div>
                ))}

              {isTyping && (
                <div className='flex justify-start'>
                  <div className='glass p-3 rounded-lg rounded-tl-none text-sm text-muted-foreground italic flex items-center gap-2'>
                    <span className='inline-flex items-center'>
                      <span
                        className='w-2 h-2 bg-muted rounded-full mr-1 animate-pulse'
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className='w-2 h-2 bg-muted rounded-full mr-1 animate-pulse'
                        style={{ animationDelay: "120ms" }}
                      />
                      <span
                        className='w-2 h-2 bg-muted rounded-full animate-pulse'
                        style={{ animationDelay: "240ms" }}
                      />
                    </span>
                    <span className='text-sm text-muted-foreground'>
                      AI is thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className='p-4 border-t border-border'>
              <div className='flex gap-2'>
                <Input
                  placeholder='Type your message...'
                  className='bg-white/10 dark:bg-background/50 border-cyber-primary/10 focus:border-accent rounded-xl text-sm'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <RippleButton
                  size='icon'
                  variant='accent'
                  className='hover:bg-accent/90 shrink-0'
                  onClick={handleSend}
                  disabled={isTyping}
                >
                  <Send className='w-4 h-4' />
                </RippleButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className='relative w-14 h-14 rounded-full bg-gradient-to-r from-accent to-cyber-primary text-white shadow-lg flex items-center justify-center'
      >
        <div className='absolute inset-0 rounded-full bg-accent/50 animate-ping opacity-30' />
        {isOpen ? (
          <X className='w-6 h-6' />
        ) : (
          <MessageCircle className='w-6 h-6' />
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
