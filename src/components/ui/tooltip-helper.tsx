import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { MobileTooltipDialog } from "./mobile-tooltip"
import { Info } from "lucide-react"

interface TooltipHelperProps {
  content: React.ReactNode
  children?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export function TooltipHelper({ 
  content, 
  children, 
  icon = <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />,
  className 
}: TooltipHelperProps) {
  const [isTouch, setIsTouch] = React.useState(false)
  
  React.useEffect(() => {
    // Detectar si es un dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
  }, []);

  // Para dispositivos táctiles, usar el diálogo
  if (isTouch) {
    return (
      <MobileTooltipDialog content={content} className={className}>
        {children || icon}
      </MobileTooltipDialog>
    )
  }

  // Para dispositivos no táctiles, usar el tooltip normal
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children || icon}
        </TooltipTrigger>
        <TooltipContent side="top" align="center" className={cn("max-w-[260px] text-xs", className)}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}