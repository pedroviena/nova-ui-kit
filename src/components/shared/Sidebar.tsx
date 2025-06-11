
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
      "flex flex-col bg-card border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-semibold">CRM Pro</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
                collapsed && "justify-center"
              )}
            >
              <Icon className="h-4 w-4" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          )
        })}
      </nav>
      
      {!collapsed && (
        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground text-center">
            CRM Pro v2.0
          </div>
        </div>
      )}
    </div>
  )
}
