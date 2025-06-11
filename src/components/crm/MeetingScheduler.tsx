
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Meeting {
  id?: string
  title: string
  attendees: string
  date: string
  time: string
  duration: string
  location: string
  description?: string
  type: "call" | "video" | "in-person"
}

interface MeetingSchedulerProps {
  meeting?: Meeting
  onSchedule: (meeting: Meeting) => void
  children?: React.ReactNode
}

export function MeetingScheduler({ meeting, onSchedule, children }: MeetingSchedulerProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Meeting>({
    title: meeting?.title || "",
    attendees: meeting?.attendees || "",
    date: meeting?.date || "",
    time: meeting?.time || "",
    duration: meeting?.duration || "30",
    location: meeting?.location || "",
    description: meeting?.description || "",
    type: meeting?.type || "call"
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.attendees || !formData.date || !formData.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    onSchedule({
      ...formData,
      id: meeting?.id || Date.now().toString()
    })
    
    toast({
      title: "Success",
      description: `Meeting ${meeting ? 'updated' : 'scheduled'} successfully`
    })
    
    setOpen(false)
    
    if (!meeting) {
      setFormData({
        title: "",
        attendees: "",
        date: "",
        time: "",
        duration: "30",
        location: "",
        description: "",
        type: "call"
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {meeting ? 'Edit Meeting' : 'Schedule Meeting'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="meeting-title">Meeting Title *</Label>
            <Input
              id="meeting-title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Client Discovery Call"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="attendees">Attendees *</Label>
            <Input
              id="attendees"
              value={formData.attendees}
              onChange={(e) => setFormData(prev => ({ ...prev, attendees: e.target.value }))}
              placeholder="john@company.com, sarah@company.com"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="meeting-date">Date *</Label>
              <Input
                id="meeting-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="meeting-time">Time *</Label>
              <Input
                id="meeting-time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={formData.duration} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, duration: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="meeting-type">Type</Label>
              <Select value={formData.type} onValueChange={(value: Meeting['type']) => 
                setFormData(prev => ({ ...prev, type: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="call">Phone Call</SelectItem>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="in-person">In Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="location">Location/Link</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="https://zoom.us/j/123456789 or Office Address"
            />
          </div>
          
          <div>
            <Label htmlFor="meeting-description">Description</Label>
            <Textarea
              id="meeting-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Meeting agenda and notes..."
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {meeting ? 'Update' : 'Schedule'} Meeting
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
