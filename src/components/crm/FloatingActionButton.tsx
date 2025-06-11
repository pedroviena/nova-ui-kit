
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
      icon: UserPlus,
      label: "Add Contact",
      color: "bg-blue-500 hover:bg-blue-600",
      component: ContactModal,
      props: { onSave: onSaveContact }
    },
    {
      icon: Calendar,
      label: "Schedule Meeting",
      color: "bg-green-500 hover:bg-green-600",
      component: MeetingScheduler,
      props: { onSchedule: onScheduleMeeting }
    },
    {
      icon: Target,
      label: "Create Deal",
      color: "bg-purple-500 hover:bg-purple-600",
      component: DealModal,
      props: { onSave: onSaveDeal }
    },
    {
      icon: Mail,
      label: "Send Email",
      color: "bg-orange-500 hover:bg-orange-600",
      component: EmailCampaign,
      props: { contacts, onSend: onSendCampaign }
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={`flex flex-col-reverse gap-3 mb-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {actions.map((action, index) => {
          const Icon = action.icon
          const Component = action.component
          return (
            <Component key={index} {...action.props}>
              <Button
                size="lg"
                className={`${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 animate-in slide-in-from-right-4`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className="h-5 w-5 mr-2" />
                {action.label}
              </Button>
            </Component>
          )
        })}
      </div>

      {/* Main toggle button */}
      <Button
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14 p-0 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  )
}
