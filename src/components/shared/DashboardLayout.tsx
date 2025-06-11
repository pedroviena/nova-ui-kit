
import { ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { NotificationCenter } from "./NotificationCenter"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Search, User, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <header className="border-b bg-card/80 backdrop-blur-md px-6 py-4 animate-in slide-in-from-top-4 shadow-sm relative overflow-hidden">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              {title && (
                <div className="flex items-center gap-3 animate-in fade-in-50 duration-700">
                  <div className="p-2 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg">
                    <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent animate-in slide-in-from-left-4 duration-500">
                    {title}
                  </h1>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Enhanced Search */}
              <div className="relative group animate-in slide-in-from-top-4 delay-200">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-all duration-200 group-focus-within:scale-110" />
                <Input 
                  placeholder="Search everything..." 
                  className="pl-9 w-64 transition-all duration-300 focus:w-80 hover:shadow-lg focus:shadow-xl border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background/80 focus:bg-background group-hover:scale-105"
                />
                {/* Search suggestions hint */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground opacity-0 group-focus-within:opacity-100 transition-opacity">
                  ⌘K
                </div>
              </div>
              
              {/* Enhanced Notification Center */}
              <div className="animate-in slide-in-from-top-4 delay-300">
                <NotificationCenter />
              </div>
              
              {/* Enhanced Theme Toggle */}
              <div className="animate-in slide-in-from-top-4 delay-400">
                <ThemeToggle />
              </div>
              
              {/* Enhanced User Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:scale-110 transition-all duration-200 hover:bg-primary/10 group relative overflow-hidden animate-in slide-in-from-top-4 delay-500"
              >
                <User className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                {/* Status indicator */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {/* Hover glow */}
                <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg" />
              </Button>
            </div>
          </div>
          
          {/* Animated bottom border */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </header>
        
        {/* Enhanced Main Content */}
        <main className="flex-1 p-6 animate-in fade-in-50 duration-1000 relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full animate-pulse" />
            <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-full animate-pulse delay-1000" />
          </div>
          
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
