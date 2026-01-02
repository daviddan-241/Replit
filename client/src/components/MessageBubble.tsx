import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import "highlight.js/styles/github-dark.css"; // We'll customize this via CSS if needed

interface MessageBubbleProps {
  role: string;
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-4 p-4 md:p-6 mb-2 rounded-lg border group",
        isUser 
          ? "bg-primary/5 border-primary/20 ml-12" 
          : "bg-black border-primary/10 mr-12 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-none border flex items-center justify-center",
        isUser ? "border-primary text-primary" : "border-primary bg-primary text-black"
      )}>
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2 mb-2 opacity-50 text-xs uppercase tracking-widest font-bold">
          <span className={isUser ? "text-primary" : "text-primary"}>
            {isUser ? "OPERATOR" : "HACX_GPT_SYSTEM"}
          </span>
          <span className="text-[10px]">• {new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="prose prose-invert prose-p:text-primary/90 prose-headings:text-primary prose-pre:bg-primary/10 prose-pre:border prose-pre:border-primary/20 max-w-none font-mono text-sm md:text-base leading-relaxed">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
