
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  Settings, 
  Menu, 
  Home,
  TrendingUp,
  DollarSign,
  Calendar,
  MessageSquare,
  Target,
  Phone,
  Mail
} from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: "Admin Dashboard", href: "/dashboards/admin", icon: Home },
    { name: "CRM Dashboard", href: "/dashboards/crm", icon: Users },
    { name: "Finance Dashboard", href: "/dashboards/finance", icon: DollarSign },
    { name: "Analytics", href: "#", icon: BarChart3 },
    { name: "Contacts", href: "/dashboards/crm", icon: Phone },
    { name: "Deals", href: "/dashboards/crm", icon: Target },
    { name: "Calendar", href: "#", icon: Calendar },
    { name: "Messages", href: "#", icon: MessageSquare },
    { name: "Reports", href: "#", icon: TrendingUp },
    { name: "Settings", href: "#", icon: Settings },
  ]

  return (
    <div className={cn(
      "flex flex-col bg-card border-r transition-all duration-300 ease-in-out animate-in slide-in-from-left-6",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-in fade-in-50 duration-300">
              CRM Pro
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hover:scale-110 transition-all duration-200"
          >
            <Menu className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")} />
          </Button>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item, index) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted hover:shadow-sm",
                collapsed && "justify-center",
                "animate-in slide-in-from-left-4"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg animate-in fade-in-50 duration-300" />
              )}
              <Icon className={cn(
                "h-4 w-4 transition-all duration-200",
                isActive && "scale-110",
                !collapsed && !isActive && "group-hover:scale-110"
              )} />
              {!collapsed && (
                <span className="ml-3 transition-all duration-200 group-hover:translate-x-1">
                  {item.name}
                </span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1 h-1 rounded-full bg-primary-foreground animate-pulse" />
              )}
            </Link>
          )
        })}
      </nav>
      
      {!collapsed && (
        <div className="p-4 border-t animate-in slide-in-from-bottom-4 delay-300">
          <div className="text-xs text-muted-foreground text-center">
            CRM Pro v2.0
            <div className="w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  )
}
