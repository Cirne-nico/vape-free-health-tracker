import * as React from "react"
import { Dialog, DialogContent, DialogTrigger } from "./dialog"
import { cn } from "@/lib/utils"

interface MobileTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
}

export function MobileTooltipDialog({ children, content, className }: MobileTooltipProps) {
  const [open, setOpen] = React.useState(false)
  const [isTouch, setIsTouch] = React.useState(false)
  
  React.useEffect(() => {
    // Detectar si es un dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
  }, []);

  // Si no es un dispositivo táctil, no renderizar nada especial
  if (!isTouch) {
    return <>{children}</>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div 
          className="cursor-pointer" 
          onTouchStart={() => setOpen(true)}
          onClick={(e) => e.preventDefault()}
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className={cn("p-4 max-w-[90vw] w-auto", className)}>
        {content}
      </DialogContent>
    </Dialog>
  )
}