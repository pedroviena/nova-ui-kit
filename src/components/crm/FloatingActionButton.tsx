
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ContactModal } from "./ContactModal"
import { MeetingScheduler } from "./MeetingScheduler"
import { DealModal } from "./DealModal"
import { EmailCampaign } from "./EmailCampaign"
import { UserPlus, Calendar, Target, Mail, Plus, X } from "lucide-react"

interface FloatingActionButtonProps {
  contacts: Array<{ name: string; email: string; company: string }>
  onSaveContact: (contact: any) => void
  onScheduleMeeting: (meeting: any) => void
  onSaveDeal: (deal: any) => void
  onSendCampaign: (campaign: any) => void
}

export function FloatingActionButton({
  contacts,
  onSaveContact,
  onScheduleMeeting,
  onSaveDeal,
  onSendCampaign
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      component: ContactModal,
      props: { onSave: onSaveContact },
      icon: UserPlus,
      label: "Add Contact",
      color: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      delay: "0ms"
    },
    {
      component: MeetingScheduler,
      props: { onSchedule: onScheduleMeeting },
      icon: Calendar,
      label: "Schedule Meeting",
      color: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      delay: "50ms"
    },
    {
      component: DealModal,
      props: { onSave: onSaveDeal },
      icon: Target,
      label: "Create Deal",
      color: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      delay: "100ms"
    },
    {
      component: EmailCampaign,
      props: { contacts, onSend: onSendCampaign },
      icon: Mail,
      label: "Send Email",
      color: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      delay: "150ms"
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop blur effect when open */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-sm animate-in fade-in-0 duration-300 pointer-events-none" />
      )}
      
      {/* Action buttons with enhanced animations */}
      <div className={`flex flex-col-reverse gap-3 mb-3 transition-all duration-500 ease-out ${
        isOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}>
        {actions.map((action, index) => {
          const Icon = action.icon
          const Component = action.component
          return (
            <Component key={index} {...action.props}>
              <Button
                size="lg"
                className={`${action.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 animate-in slide-in-from-right-8 backdrop-blur-sm border border-white/20 group relative overflow-hidden`}
                style={{ 
                  animationDelay: action.delay,
                  animationDuration: '600ms'
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <Icon className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                <span className="relative z-10">{action.label}</span>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Component>
          )
        })}
      </div>

      {/* Enhanced main toggle button */}
      <Button
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-full w-16 h-16 p-0 border-2 border-white/20 backdrop-blur-sm group relative overflow-hidden ${
          isOpen ? 'rotate-45 scale-110' : 'rotate-0 scale-100 hover:scale-110'
        }`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 rounded-full animate-pulse opacity-50" />
        
        {/* Icon with smooth transition */}
        <div className="relative z-10 transition-all duration-300">
          {isOpen ? (
            <X className="h-7 w-7 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Plus className="h-7 w-7 group-hover:rotate-180 transition-transform duration-300" />
          )}
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200" />
        
        {/* Outer glow ring */}
        <div className={`absolute inset-0 rounded-full bg-primary/30 transition-all duration-500 ${
          isOpen ? 'scale-150 opacity-20' : 'scale-100 opacity-0'
        }`} />
      </Button>
      
      {/* Floating particles effect when open */}
      {isOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full animate-ping"
              style={{
                top: `${Math.sin(i * 60 * Math.PI / 180) * 40}px`,
                left: `${Math.cos(i * 60 * Math.PI / 180) * 40}px`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
