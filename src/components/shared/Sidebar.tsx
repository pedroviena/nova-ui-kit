
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
  Mail,
  Zap
} from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: "Admin Dashboard", href: "/dashboards/admin", icon: Home, badge: "" },
    { name: "CRM Dashboard", href: "/dashboards/crm", icon: Users, badge: "HOT" },
    { name: "Finance Dashboard", href: "/dashboards/finance", icon: DollarSign, badge: "" },
    { name: "Analytics", href: "#", icon: BarChart3, badge: "NEW" },
    { name: "Contacts", href: "/dashboards/crm", icon: Phone, badge: "" },
    { name: "Deals", href: "/dashboards/crm", icon: Target, badge: "3" },
    { name: "Calendar", href: "#", icon: Calendar, badge: "" },
    { name: "Messages", href: "#", icon: MessageSquare, badge: "12" },
    { name: "Reports", href: "#", icon: TrendingUp, badge: "" },
    { name: "Settings", href: "#", icon: Settings, badge: "" },
  ]

  return (
    <div className={cn(
      "flex flex-col bg-gradient-to-b from-card via-card to-card/95 border-r border-border/50 backdrop-blur-sm transition-all duration-500 ease-in-out animate-in slide-in-from-left-6 shadow-xl",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Enhanced Header */}
      <div className="p-4 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2 animate-in fade-in-50 duration-500">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent">
                CRM Pro
              </h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hover:scale-110 transition-all duration-300 hover:bg-primary/10 group relative overflow-hidden"
          >
            <Menu className={cn(
              "h-4 w-4 transition-all duration-500 group-hover:text-primary",
              collapsed && "rotate-180"
            )} />
            <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg" />
          </Button>
        </div>
      </div>
      
      {/* Enhanced Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item, index) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden backdrop-blur-sm",
                isActive 
                  ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg scale-105" 
                  : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/20 hover:shadow-md hover:scale-105",
                collapsed && "justify-center px-2",
                "animate-in slide-in-from-left-4 border border-transparent hover:border-border/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Background effects */}
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-xl animate-in fade-in-50 duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl" />
                </>
              )}
              
              {/* Hover shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl" />
              
              {/* Icon with enhanced animations */}
              <div className="relative z-10 flex items-center">
                <Icon className={cn(
                  "h-5 w-5 transition-all duration-300 group-hover:scale-110",
                  isActive && "scale-110 drop-shadow-sm",
                  !collapsed && !isActive && "group-hover:rotate-12"
                )} />
                
                {!collapsed && (
                  <span className="ml-3 transition-all duration-300 group-hover:translate-x-1 relative z-10">
                    {item.name}
                  </span>
                )}
              </div>
              
              {/* Badge */}
              {!collapsed && item.badge && (
                <div className={cn(
                  "ml-auto px-2 py-1 rounded-full text-xs font-bold animate-pulse transition-all duration-200 group-hover:scale-110",
                  item.badge === "HOT" && "bg-red-500 text-white",
                  item.badge === "NEW" && "bg-green-500 text-white", 
                  item.badge.match(/^\d+$/) && "bg-blue-500 text-white"
                )}>
                  {item.badge}
                </div>
              )}
              
              {/* Active indicator */}
              {isActive && !collapsed && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary-foreground animate-pulse shadow-sm" />
              )}
              
              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg border">
                  {item.name}
                  {item.badge && (
                    <span className={cn(
                      "ml-1 px-1 rounded text-xs",
                      item.badge === "HOT" && "bg-red-500 text-white",
                      item.badge === "NEW" && "bg-green-500 text-white",
                      item.badge.match(/^\d+$/) && "bg-blue-500 text-white"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          )
        })}
      </nav>
      
      {/* Enhanced Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border/30 bg-gradient-to-r from-muted/20 to-transparent animate-in slide-in-from-bottom-4 delay-300">
          <div className="text-center space-y-2">
            <div className="text-xs text-muted-foreground font-medium">
              CRM Pro v2.0
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
            </div>
            <div className="text-xs text-muted-foreground">
              🚀 Built with Lovable
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
