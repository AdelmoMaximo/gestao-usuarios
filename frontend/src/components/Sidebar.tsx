"use client"

import { useState } from "react"
import { Home, Lock, ChevronDown, User, ChevronLeft } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarProps {
  isCollapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
}

export function Sidebar({ isCollapsed, onCollapsedChange }: SidebarProps) {
  const [isAccessControlOpen, setIsAccessControlOpen] = useState(true)
  const location = useLocation()

  return (
    <div className="relative">
      <div
        className={cn(
          "fixed left-0 top-0 min-h-screen bg-[#0F1E36] text-white p-4 transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <div className="mb-8 relative">
          <Link
            to="/"
            className={cn("text-2xl font-bold transition-all duration-300", isCollapsed ? "text-center block" : "")}
          >
            {isCollapsed ? (
              <span className="text-primary text-3xl">W</span>
            ) : (
              <>
                <span className="text-primary">Wen</span>
                <span className="text-white">Lock</span>
                <span className="text-primary">.</span>
              </>
            )}
          </Link>
          <button
            onClick={() => onCollapsedChange(!isCollapsed)}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-50"
          >
            <ChevronLeft
              className={cn("h-6 w-6 text-gray-600 transition-transform duration-300", isCollapsed ? "rotate-180" : "")}
            />
          </button>
        </div>

        <nav className="space-y-2">
          <Link
            to="/"
            className={cn("flex items-center gap-2 p-3 rounded hover:bg-gray-700", isCollapsed ? "justify-center" : "")}
          >
            <Home size={20} />
            {!isCollapsed && <span>Home</span>}
          </Link>

          <Collapsible open={isAccessControlOpen} onOpenChange={setIsAccessControlOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded hover:bg-gray-700">
              <div className={cn("flex items-center gap-2", isCollapsed ? "justify-center" : "")}>
                <Lock size={20} />
                {!isCollapsed && <span>Controle de Acesso</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown
                  size={16}
                  className={cn("transition-transform duration-200", isAccessControlOpen ? "rotate-180" : "")}
                />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Link
                to="/usuarios"
                className={cn(
                  "flex items-center gap-2 p-3 rounded hover:bg-gray-700 ml-0",
                  isCollapsed ? "justify-center" : "pl-11",
                  location.pathname === "/usuarios" ? "bg-primary" : "",
                )}
              >
                <User size={20} />
                {!isCollapsed && <span>Usuários</span>}
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </nav>

        <div
          className={cn(
            "absolute bottom-4 left-4 text-sm text-gray-400",
            isCollapsed ? "left-1/2 transform -translate-x-1/2 text-center" : "",
          )}
        >
          {!isCollapsed && (
            <>
              <p>© WenLock</p>
              <p className="text-xs">Powered by Connecttus</p>
              <p className="text-xs">V.0.0.0</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

