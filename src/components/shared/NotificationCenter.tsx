
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Mail, Target, Users } from "lucide-react"

interface Notification {
  id: string
  type: "deal" | "meeting" | "contact" | "email"
  title: string
  description: string
  time: string
  read: boolean
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "deal",
      title: "Deal Update",
      description: "Website Redesign moved to Proposal stage",
      time: "2 min ago",
      read: false
    },
    {
      id: "2",
      type: "meeting",
      title: "Upcoming Meeting",
      description: "Client call with TechCorp in 30 minutes",
      time: "28 min",
      read: false
    },
    {
      id: "3",
      type: "contact",
      title: "New Contact",
      description: "Sarah Johnson added to your contacts",
      time: "1 hour ago",
      read: false
    },
    {
      id: "4",
      type: "email",
      title: "Email Campaign",
      description: "Monthly newsletter sent to 150 contacts",
      time: "2 hours ago",
      read: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "deal": return Target
      case "meeting": return Calendar
      case "contact": return Users
      case "email": return Mail
      default: return Bell
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "deal": return "text-purple-500"
      case "meeting": return "text-green-500"
      case "contact": return "text-blue-500"
      case "email": return "text-orange-500"
      default: return "text-gray-500"
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1 min-w-5 h-5 text-xs bg-red-500 hover:bg-red-500 animate-pulse">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4 animate-in slide-in-from-top-2">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Notifications</CardTitle>
            <CardDescription>
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {notifications.map((notification, index) => {
              const Icon = getIcon(notification.type)
              return (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-muted/50 animate-in slide-in-from-left-4 ${
                    notification.read ? 'opacity-60' : 'border-primary/20 bg-primary/5'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-1.5 rounded-full bg-muted ${getIconColor(notification.type)}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
