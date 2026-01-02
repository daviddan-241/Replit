import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings } from "@/hooks/use-settings";
import { Settings as SettingsIcon, Terminal, Lock, Cpu } from "lucide-react";

export function SettingsModal() {
  const [open, setOpen] = useState(false);
  const { settings, updateSettings, isUpdating } = useSettings();
  
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      apiKey: "",
      provider: "openrouter",
      model: "kwaipilot/kat-coder-pro:free"
    }
  });

  useEffect(() => {
    if (settings) {
      reset({
        apiKey: settings.apiKey || "",
        provider: settings.provider || "openrouter",
        model: settings.model || "kwaipilot/kat-coder-pro:free",
      });
    }
  }, [settings, reset]);

  const onSubmit = (data: any) => {
    updateSettings(data, {
      onSuccess: () => setOpen(false)
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-primary/20 text-primary hover:text-primary">
          <SettingsIcon className="w-4 h-4" />
          SETTINGS_CONFIG
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black border border-primary text-primary shadow-[0_0_20px_rgba(34,197,94,0.15)] font-mono max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold border-b border-primary/30 pb-4">
            <Terminal className="w-5 h-5" />
            SYSTEM_CONFIGURATION
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/70">
              <Cpu className="w-3 h-3" /> Provider
            </Label>
            <Select 
              onValueChange={(val) => setValue("provider", val)} 
              defaultValue={settings?.provider || "openrouter"}
            >
              <SelectTrigger className="bg-black border-primary/50 text-primary focus:ring-primary/30 h-12">
                <SelectValue placeholder="Select Provider" />
              </SelectTrigger>
              <SelectContent className="bg-black border-primary text-primary">
                <SelectItem value="openrouter">OpenRouter</SelectItem>
                <SelectItem value="deepseek">DeepSeek</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/70">
              <Lock className="w-3 h-3" /> API Key
            </Label>
            <Input
              {...register("apiKey")}
              type="password"
              placeholder="sk-or-..."
              className="bg-black border-primary/50 text-primary focus:ring-primary/30 placeholder:text-primary/20 h-12 font-mono"
            />
            <p className="text-[10px] text-primary/50 uppercase">
              Keys are encrypted at rest. Never shared.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/70">
              <Terminal className="w-3 h-3" /> Model ID
            </Label>
            <Input
              {...register("model")}
              placeholder="kwaipilot/kat-coder-pro:free"
              className="bg-black border-primary/50 text-primary focus:ring-primary/30 placeholder:text-primary/20 h-12 font-mono"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
            >
              CANCEL
            </Button>
            <Button 
              type="submit" 
              disabled={isUpdating}
              className="bg-primary text-black hover:bg-primary/90 font-bold tracking-wider"
            >
              {isUpdating ? "WRITING..." : "SAVE_CONFIG"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
