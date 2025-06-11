
import { ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { NotificationCenter } from "./NotificationCenter"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm px-6 py-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-in fade-in-50 duration-500">
                  {title}
                </h1>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search..." 
                  className="pl-9 w-64 transition-all duration-200 focus:w-72 hover:shadow-md"
                />
              </div>
              
              <NotificationCenter />
              
              <ThemeToggle />
              
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 animate-in fade-in-50 duration-700">
          {children}
        </main>
      </div>
    </div>
  )
}
