import { useState } from "react"
import { DashboardLayout } from "@/components/shared/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ContactModal } from "@/components/crm/ContactModal"
import { DealModal } from "@/components/crm/DealModal"
import { MeetingScheduler } from "@/components/crm/MeetingScheduler"
import { EmailCampaign } from "@/components/crm/EmailCampaign"
import { ContactList } from "@/components/crm/ContactList"
import { FloatingActionButton } from "@/components/crm/FloatingActionButton"
import { 
  Users, 
  UserPlus, 
  Target, 
  Calendar,
  Mail,
  TrendingUp,
  DollarSign,
  Phone,
  Zap
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts"
import { useToast } from "@/hooks/use-toast"

const CRMDashboard = () => {
  const { toast } = useToast()
  
  // State management for contacts
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      phone: "+1 (555) 123-4567",
      company: "TechCorp Inc.",
      status: "hot" as const,
      value: "$45,000",
      notes: "Interested in enterprise solution",
      tags: ["enterprise", "priority"]
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@startup.io",
      phone: "+1 (555) 987-6543",
      company: "StartupXYZ",
      status: "warm" as const,
      value: "$23,000",
      notes: "Follow up next week",
      tags: ["startup", "recurring"]
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily@enterprise.com",
      phone: "+1 (555) 456-7890",
      company: "Enterprise Solutions",
      status: "cold" as const,
      value: "$67,000",
      notes: "Large potential deal",
      tags: ["enterprise", "long-term"]
    }
  ])

  // State management for deals
  const [deals, setDeals] = useState([
    { id: "1", name: "Website Redesign", company: "TechCorp", value: "$45,000", stage: "Proposal" as const, progress: 75, description: "Complete website overhaul" },
    { id: "2", name: "Mobile App Dev", company: "StartupXYZ", value: "$23,000", stage: "Negotiation" as const, progress: 60, description: "iOS and Android app" },
    { id: "3", name: "Cloud Migration", company: "Enterprise", value: "$67,000", stage: "Discovery" as const, progress: 25, description: "AWS cloud migration" },
    { id: "4", name: "AI Integration", company: "Innovate Labs", value: "$34,000", stage: "Closed Won" as const, progress: 100, description: "AI chatbot integration" }
  ])

  // State management for meetings
  const [meetings, setMeetings] = useState([
    { id: "1", title: "Client Discovery", attendees: "sarah@techcorp.com", date: "2024-01-15", time: "14:00", duration: "60", location: "Zoom", type: "video" as const }
  ])

  // State management for email campaigns
  const [campaigns, setCampaigns] = useState([
    { id: "1", subject: "Welcome to our platform", content: "Thank you for your interest...", recipients: ["sarah@techcorp.com"] }
  ])

  // Chart data
  const salesData = [
    { month: "Jan", leads: 45, deals: 12, revenue: 145000 },
    { month: "Feb", leads: 52, deals: 15, revenue: 178000 },
    { month: "Mar", leads: 38, deals: 8, revenue: 98000 },
    { month: "Apr", leads: 61, deals: 18, revenue: 234000 },
    { month: "May", leads: 42, deals: 14, revenue: 187000 },
    { month: "Jun", leads: 55, deals: 16, revenue: 203000 },
  ]

  const revenueData = [
    { month: "Jan", value: 145000 },
    { month: "Feb", value: 178000 },
    { month: "Mar", value: 98000 },
    { month: "Apr", value: 234000 },
    { month: "May", value: 187000 },
    { month: "Jun", value: 203000 },
  ]

  // Calculate stats from current data
  const stats = [
    { 
      title: "Total Contacts", 
      value: contacts.length.toString(), 
      icon: Users, 
      color: "text-blue-600",
      change: "+12%",
      trend: "up"
    },
    { 
      title: "Active Deals", 
      value: deals.filter(d => d.stage !== "Closed Won" && d.stage !== "Closed Lost").length.toString(), 
      icon: Target, 
      color: "text-purple-600",
      change: "+8%",
      trend: "up"
    },
    { 
      title: "Revenue Pipeline", 
      value: `$${deals.reduce((sum, deal) => sum + parseInt(deal.value.replace(/[$,]/g, '')), 0).toLocaleString()}`, 
      icon: DollarSign, 
      color: "text-green-600",
      change: "+15%",
      trend: "up"
    },
    { 
      title: "Meetings Scheduled", 
      value: meetings.length.toString(), 
      icon: Calendar, 
      color: "text-orange-600",
      change: "+5%",
      trend: "up"
    },
  ]

  // Handler functions
  const handleSaveContact = (contact: any) => {
    if (contact.id && contacts.find(c => c.id === contact.id)) {
      setContacts(contacts.map(c => c.id === contact.id ? contact : c))
    } else {
      setContacts([...contacts, { ...contact, id: Date.now().toString() }])
    }
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id))
    toast({
      title: "Contact deleted",
      description: "Contact has been successfully removed"
    })
  }

  const handleSaveDeal = (deal: any) => {
    if (deal.id && deals.find(d => d.id === deal.id)) {
      setDeals(deals.map(d => d.id === deal.id ? deal : d))
    } else {
      setDeals([...deals, { ...deal, id: Date.now().toString() }])
    }
  }

  const handleScheduleMeeting = (meeting: any) => {
    if (meeting.id && meetings.find(m => m.id === meeting.id)) {
      setMeetings(meetings.map(m => m.id === meeting.id ? meeting : m))
    } else {
      setMeetings([...meetings, { ...meeting, id: Date.now().toString() }])
    }
  }

  const handleSendCampaign = (campaign: any) => {
    setCampaigns([...campaigns, { ...campaign, id: Date.now().toString() }])
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Discovery": return "bg-blue-100 text-blue-800"
      case "Proposal": return "bg-yellow-100 text-yellow-800"
      case "Negotiation": return "bg-orange-100 text-orange-800"
      case "Closed Won": return "bg-green-100 text-green-800"
      case "Closed Lost": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout title="CRM Dashboard">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">{stat.change}</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts and Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
              <CardDescription>Leads vs Closed Deals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="leads" fill="hsl(var(--primary))" name="Leads" />
                  <Bar dataKey="deals" fill="hsl(var(--muted))" name="Deals" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common CRM tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <ContactModal onSave={handleSaveContact}>
                <Button className="w-full justify-start" variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New Contact
                </Button>
              </ContactModal>
              
              <MeetingScheduler onSchedule={handleScheduleMeeting}>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </MeetingScheduler>
              
              <DealModal onSave={handleSaveDeal}>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Create Deal
                </Button>
              </DealModal>
              
              <EmailCampaign contacts={contacts} onSend={handleSendCampaign}>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email Campaign
                </Button>
              </EmailCampaign>
            </div>
          </CardContent>
        </Card>

        {/* Contacts and Deals */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ContactList 
            contacts={contacts} 
            onUpdateContact={handleSaveContact}
            onDeleteContact={handleDeleteContact}
          />

          <Card>
            <CardHeader>
              <CardTitle>Active Deals</CardTitle>
              <CardDescription>Deals in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deals.map((deal, index) => (
                  <div key={index} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{deal.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                        {deal.stage}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{deal.company}</p>
                    <p className="text-xs text-muted-foreground mb-3">{deal.description}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{deal.value}</span>
                      <span className="text-sm text-muted-foreground">{deal.progress}%</span>
                    </div>
                    <Progress value={deal.progress} className="h-2" />
                    <div className="flex gap-2 mt-3">
                      <DealModal deal={deal} onSave={handleSaveDeal}>
                        <Button size="sm" variant="outline">Edit</Button>
                      </DealModal>
                      <Button size="sm" variant="ghost">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest CRM activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New contact added: Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Deal updated: Website Redesign moved to Proposal</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Meeting scheduled with Enterprise Solutions</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Email campaign sent to 150 contacts</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        contacts={contacts}
        onSaveContact={handleSaveContact}
        onScheduleMeeting={handleScheduleMeeting}
        onSaveDeal={handleSaveDeal}
        onSendCampaign={handleSendCampaign}
      />
    </DashboardLayout>
  )
}

export default CRMDashboard
