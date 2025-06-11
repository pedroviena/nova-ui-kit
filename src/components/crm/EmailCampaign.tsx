
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Mail, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EmailCampaign {
  id?: string
  subject: string
  content: string
  recipients: string[]
  scheduled?: boolean
  scheduleDate?: string
  scheduleTime?: string
}

interface EmailCampaignProps {
  campaign?: EmailCampaign
  onSend: (campaign: EmailCampaign) => void
  children?: React.ReactNode
  contacts?: Array<{ name: string; email: string; company: string }>
}

export function EmailCampaign({ campaign, onSend, children, contacts = [] }: EmailCampaignProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<EmailCampaign>({
    subject: campaign?.subject || "",
    content: campaign?.content || "",
    recipients: campaign?.recipients || [],
    scheduled: campaign?.scheduled || false,
    scheduleDate: campaign?.scheduleDate || "",
    scheduleTime: campaign?.scheduleTime || ""
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.subject || !formData.content || formData.recipients.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select recipients",
        variant: "destructive"
      })
      return
    }

    if (formData.scheduled && (!formData.scheduleDate || !formData.scheduleTime)) {
      toast({
        title: "Error",
        description: "Please set schedule date and time",
        variant: "destructive"
      })
      return
    }

    onSend({
      ...formData,
      id: campaign?.id || Date.now().toString()
    })
    
    toast({
      title: "Success",
      description: formData.scheduled ? "Email campaign scheduled successfully" : "Email campaign sent successfully"
    })
    
    setOpen(false)
    
    if (!campaign) {
      setFormData({
        subject: "",
        content: "",
        recipients: [],
        scheduled: false,
        scheduleDate: "",
        scheduleTime: ""
      })
    }
  }

  const toggleRecipient = (email: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.includes(email)
        ? prev.recipients.filter(r => r !== email)
        : [...prev.recipients, email]
    }))
  }

  const selectAllRecipients = () => {
    const allEmails = contacts.map(c => c.email)
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.length === allEmails.length ? [] : allEmails
    }))
  }

  const emailTemplates = [
    {
      name: "Follow-up",
      subject: "Following up on our conversation",
      content: "Hi {{name}},\n\nI wanted to follow up on our recent conversation about {{topic}}. Do you have any questions or would you like to schedule a next step?\n\nBest regards,\n{{sender}}"
    },
    {
      name: "Introduction",
      subject: "Nice to meet you!",
      content: "Hi {{name}},\n\nIt was great meeting you today. I'm excited about the opportunity to work with {{company}}.\n\nI'll follow up with the information we discussed.\n\nBest regards,\n{{sender}}"
    }
  ]

  const useTemplate = (template: typeof emailTemplates[0]) => {
    setFormData(prev => ({
      ...prev,
      subject: template.subject,
      content: template.content
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Send Email Campaign
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {campaign ? 'Edit Email Campaign' : 'Create Email Campaign'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Quick Templates</Label>
            <div className="flex gap-2 mt-1">
              {emailTemplates.map((template, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => useTemplate(template)}
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="email-subject">Subject *</Label>
            <Input
              id="email-subject"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Your email subject line"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email-content">Email Content *</Label>
            <Textarea
              id="email-content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Your email content..."
              rows={8}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use {{`{name}`}}, {{`{company}`}} for personalization
            </p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Recipients * ({formData.recipients.length} selected)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={selectAllRecipients}
              >
                {formData.recipients.length === contacts.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            <div className="max-h-32 overflow-y-auto border rounded-md p-2 space-y-2">
              {contacts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No contacts available</p>
              ) : (
                contacts.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`contact-${index}`}
                      checked={formData.recipients.includes(contact.email)}
                      onCheckedChange={() => toggleRecipient(contact.email)}
                    />
                    <label htmlFor={`contact-${index}`} className="text-sm flex-1 cursor-pointer">
                      {contact.name} ({contact.company})
                    </label>
                    <Badge variant="outline" className="text-xs">
                      {contact.email}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="schedule"
              checked={formData.scheduled}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, scheduled: !!checked }))}
            />
            <Label htmlFor="schedule">Schedule for later</Label>
          </div>
          
          {formData.scheduled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schedule-date">Schedule Date</Label>
                <Input
                  id="schedule-date"
                  type="date"
                  value={formData.scheduleDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="schedule-time">Schedule Time</Label>
                <Input
                  id="schedule-time"
                  type="time"
                  value={formData.scheduleTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduleTime: e.target.value }))}
                />
              </div>
            </div>
          )}
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              {formData.scheduled ? 'Schedule Campaign' : 'Send Campaign'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
