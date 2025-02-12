"use client"

import * as React from "react"
import { X, CheckCircle2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  variant: "success" | "warning" | "error"
  message: string
  open: boolean
  onClose: () => void
}

export function Toast({ variant, message, open, onClose }: ToastProps) {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg px-4 py-3 text-white shadow-lg min-w-[280px]",
          variant === "success" && "bg-[#00DC7D]",
          variant === "warning" && "bg-[#FF9500]",
          variant === "error" && "bg-red-500",
        )}
      >
        <div className="flex items-center gap-2 flex-1">
          {variant === "success" && <CheckCircle2 className="h-5 w-5" />}
          {variant === "warning" && <AlertTriangle className="h-5 w-5" />}
          {variant === "error" && <AlertTriangle className="h-5 w-5" />}
          <span className="text-sm font-medium">{message}</span>
        </div>
        <button onClick={onClose} className="rounded-lg p-1 hover:bg-white/20">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

