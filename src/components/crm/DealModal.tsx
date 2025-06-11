
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Deal {
  id?: string
  name: string
  company: string
  value: string
  stage: "Discovery" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost"
  progress: number
  description?: string
  expectedCloseDate?: string
}

interface DealModalProps {
  deal?: Deal
  onSave: (deal: Deal) => void
  children?: React.ReactNode
}

export function DealModal({ deal, onSave, children }: DealModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Deal>({
    name: deal?.name || "",
    company: deal?.company || "",
    value: deal?.value || "",
    stage: deal?.stage || "Discovery",
    progress: deal?.progress || 0,
    description: deal?.description || "",
    expectedCloseDate: deal?.expectedCloseDate || ""
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.company || !formData.value) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    onSave({
      ...formData,
      id: deal?.id || Date.now().toString()
    })
    
    toast({
      title: "Success",
      description: `Deal ${deal ? 'updated' : 'created'} successfully`
    })
    
    setOpen(false)
    
    if (!deal) {
      setFormData({
        name: "",
        company: "",
        value: "",
        stage: "Discovery",
        progress: 0,
        description: "",
        expectedCloseDate: ""
      })
    }
  }

  const stageProgressMap = {
    "Discovery": 25,
    "Proposal": 50,
    "Negotiation": 75,
    "Closed Won": 100,
    "Closed Lost": 0
  }

  const handleStageChange = (stage: Deal['stage']) => {
    setFormData(prev => ({
      ...prev,
      stage,
      progress: stageProgressMap[stage]
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Create Deal
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {deal ? 'Edit Deal' : 'Create New Deal'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="deal-name">Deal Name *</Label>
            <Input
              id="deal-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Website Redesign Project"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deal-company">Company *</Label>
              <Input
                id="deal-company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Company Inc."
                required
              />
            </div>
            <div>
              <Label htmlFor="deal-value">Deal Value *</Label>
              <Input
                id="deal-value"
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                placeholder="$50,000"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="deal-stage">Stage</Label>
            <Select value={formData.stage} onValueChange={handleStageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Discovery">Discovery</SelectItem>
                <SelectItem value="Proposal">Proposal</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
                <SelectItem value="Closed Won">Closed Won</SelectItem>
                <SelectItem value="Closed Lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Progress: {formData.progress}%</Label>
            <Slider
              value={[formData.progress]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, progress: value[0] }))}
              max={100}
              step={5}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="expected-close">Expected Close Date</Label>
            <Input
              id="expected-close"
              type="date"
              value={formData.expectedCloseDate}
              onChange={(e) => setFormData(prev => ({ ...prev, expectedCloseDate: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="deal-description">Description</Label>
            <Textarea
              id="deal-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Deal description and notes..."
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {deal ? 'Update' : 'Create'} Deal
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
