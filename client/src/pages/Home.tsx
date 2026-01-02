import { GlitchText } from "@/components/GlitchText";
import { Terminal, Shield, Cpu, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black">
      <div className="max-w-2xl space-y-8 animate-in fade-in zoom-in duration-500">
        
        <div className="inline-block p-6 rounded-full bg-primary/5 border border-primary/20 mb-4 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
          <Terminal className="w-16 h-16 text-primary animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-primary text-glow">
          <GlitchText text="HACX_GPT_SYSTEM" />
        </h1>
        
        <p className="text-xl text-primary/60 font-mono tracking-wide max-w-lg mx-auto">
          Unrestricted AI access established. 
          Select a protocol from the sidebar to begin operation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {[
            { icon: Shield, title: "SECURE_CHANNEL", desc: "Encrypted end-to-end communication" },
            { icon: Cpu, title: "MULTI_MODEL", desc: "Access DeepSeek & OpenRouter LLMs" },
            { icon: Zap, title: "UNRESTRICTED", desc: "Full control over AI parameters" },
          ].map((item, i) => (
            <div key={i} className="p-4 border border-primary/20 bg-black/50 hover:bg-primary/5 hover:border-primary/50 transition-all group">
              <item.icon className="w-8 h-8 text-primary/50 mb-3 group-hover:text-primary transition-colors" />
              <h3 className="text-sm font-bold text-primary mb-1 tracking-wider">{item.title}</h3>
              <p className="text-xs text-primary/40">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-[10px] text-primary/30 font-mono uppercase tracking-[0.3em] animate-pulse">
          System Ready • Connection Stable • v2.0.4
        </div>
      </div>
    </div>
  );
}
