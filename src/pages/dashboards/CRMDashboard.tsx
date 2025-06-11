
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
  Zap,
  Activity,
  BarChart3
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
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { useToast } from "@/hooks/use-toast"

type DealStage = "Discovery" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost"

interface Deal {
  id: string
  name: string
  company: string
  value: string
  stage: DealStage
  progress: number
  description: string
}

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
  const [deals, setDeals] = useState<Deal[]>([
    { id: "1", name: "Website Redesign", company: "TechCorp", value: "$45,000", stage: "Proposal", progress: 75, description: "Complete website overhaul" },
    { id: "2", name: "Mobile App Dev", company: "StartupXYZ", value: "$23,000", stage: "Negotiation", progress: 60, description: "iOS and Android app" },
    { id: "3", name: "Cloud Migration", company: "Enterprise", value: "$67,000", stage: "Discovery", progress: 25, description: "AWS cloud migration" },
    { id: "4", name: "AI Integration", company: "Innovate Labs", value: "$34,000", stage: "Closed Won", progress: 100, description: "AI chatbot integration" }
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

  const dealStageData = [
    { name: "Discovery", value: 25, color: "#3b82f6" },
    { name: "Proposal", value: 35, color: "#eab308" },
    { name: "Negotiation", value: 25, color: "#f97316" },
    { name: "Closed Won", value: 15, color: "#22c55e" }
  ]

  // Calculate stats from current data
  const stats = [
    { 
      title: "Total Contacts", 
      value: contacts.length.toString(), 
      icon: Users, 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      trend: "up"
    },
    { 
      title: "Active Deals", 
      value: deals.filter(d => d.stage !== "Closed Won" && d.stage !== "Closed Lost").length.toString(), 
      icon: Target, 
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+8%",
      trend: "up"
    },
    { 
      title: "Revenue Pipeline", 
      value: `$${deals.reduce((sum, deal) => sum + parseInt(deal.value.replace(/[$,]/g, '')), 0).toLocaleString()}`, 
      icon: DollarSign, 
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+15%",
      trend: "up"
    },
    { 
      title: "Meetings Scheduled", 
      value: meetings.length.toString(), 
      icon: Calendar, 
      color: "text-orange-600",
      bgColor: "bg-orange-50",
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
    toast({
      title: "Success",
      description: "Contact saved successfully",
    })
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
    toast({
      title: "Success",
      description: "Deal saved successfully",
    })
  }

  const handleScheduleMeeting = (meeting: any) => {
    if (meeting.id && meetings.find(m => m.id === meeting.id)) {
      setMeetings(meetings.map(m => m.id === meeting.id ? meeting : m))
    } else {
      setMeetings([...meetings, { ...meeting, id: Date.now().toString() }])
    }
    toast({
      title: "Success",
      description: "Meeting scheduled successfully",
    })
  }

  const handleSendCampaign = (campaign: any) => {
    setCampaigns([...campaigns, { ...campaign, id: Date.now().toString() }])
    toast({
      title: "Success",
      description: "Email campaign sent successfully",
    })
  }

  const getStageColor = (stage: DealStage) => {
    switch (stage) {
      case "Discovery": return "bg-blue-100 text-blue-800 border-blue-200"
      case "Proposal": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Negotiation": return "bg-orange-100 text-orange-800 border-orange-200"
      case "Closed Won": return "bg-green-100 text-green-800 border-green-200"
      case "Closed Lost": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <DashboardLayout title="CRM Dashboard">
      <div className="space-y-8 animate-in fade-in-50 duration-700">
        {/* Enhanced Stats Grid with Animations */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card 
                key={index} 
                className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-105 animate-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 ${stat.bgColor} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
                    {stat.value}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1 animate-pulse" />
                      <span className="text-green-500 font-medium">{stat.change}</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Sales Pipeline Chart */}
          <Card className="lg:col-span-2 hover:shadow-xl transition-all duration-300 animate-in slide-in-from-left-6 delay-200">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Sales Pipeline
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Monthly leads vs closed deals performance
                  </CardDescription>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis 
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }} 
                  />
                  <Bar 
                    dataKey="leads" 
                    fill="hsl(var(--primary))" 
                    name="Leads" 
                    radius={[4, 4, 0, 0]}
                    className="animate-in slide-in-from-bottom-4 duration-700 delay-500"
                  />
                  <Bar 
                    dataKey="deals" 
                    fill="hsl(var(--muted))" 
                    name="Deals" 
                    radius={[4, 4, 0, 0]}
                    className="animate-in slide-in-from-bottom-4 duration-700 delay-700"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Deal Stage Distribution */}
          <Card className="hover:shadow-xl transition-all duration-300 animate-in slide-in-from-right-6 delay-300">
            <CardHeader className="border-b bg-gradient-to-r from-purple-500/5 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Deal Stages</CardTitle>
                  <CardDescription>Current distribution</CardDescription>
                </div>
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={dealStageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    className="animate-in fade-in-50 duration-1000 delay-800"
                  >
                    {dealStageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {dealStageData.map((item, index) => (
                  <div 
                    key={item.name} 
                    className="flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300"
                    style={{ animationDelay: `${900 + index * 100}ms` }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend Chart */}
        <Card className="hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-6 delay-400">
          <CardHeader className="border-b bg-gradient-to-r from-green-500/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly revenue growth trajectory</CardDescription>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis 
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, className: "animate-pulse" }}
                  className="animate-in slide-in-from-left-6 duration-1000 delay-600"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced Quick Actions */}
        <Card className="hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-6 delay-500">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
                <CardDescription>Streamline your CRM workflow with one-click actions</CardDescription>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-6 w-6 text-primary animate-pulse" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <ContactModal onSave={handleSaveContact}>
                <Button 
                  className="w-full justify-start group hover:scale-105 transition-all duration-200 hover:shadow-lg animate-in slide-in-from-left-4 delay-600" 
                  variant="outline"
                >
                  <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Add New Contact
                </Button>
              </ContactModal>
              
              <MeetingScheduler onSchedule={handleScheduleMeeting}>
                <Button 
                  className="w-full justify-start group hover:scale-105 transition-all duration-200 hover:shadow-lg animate-in slide-in-from-left-4 delay-700" 
                  variant="outline"
                >
                  <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Schedule Meeting
                </Button>
              </MeetingScheduler>
              
              <DealModal onSave={handleSaveDeal}>
                <Button 
                  className="w-full justify-start group hover:scale-105 transition-all duration-200 hover:shadow-lg animate-in slide-in-from-left-4 delay-800" 
                  variant="outline"
                >
                  <Target className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Create Deal
                </Button>
              </DealModal>
              
              <EmailCampaign contacts={contacts} onSend={handleSendCampaign}>
                <Button 
                  className="w-full justify-start group hover:scale-105 transition-all duration-200 hover:shadow-lg animate-in slide-in-from-left-4 delay-900" 
                  variant="outline"
                >
                  <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Send Email Campaign
                </Button>
              </EmailCampaign>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Contacts and Deals Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="animate-in slide-in-from-left-6 delay-600">
            <ContactList 
              contacts={contacts} 
              onUpdateContact={handleSaveContact}
              onDeleteContact={handleDeleteContact}
            />
          </div>

          <Card className="hover:shadow-xl transition-all duration-300 animate-in slide-in-from-right-6 delay-700">
            <CardHeader className="border-b bg-gradient-to-r from-purple-500/5 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">Active Deals</CardTitle>
                  <CardDescription>Track your sales pipeline progress</CardDescription>
                </div>
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {deals.map((deal, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl border bg-gradient-to-r from-card to-card/50 hover:from-muted/50 hover:to-card transition-all duration-300 hover:shadow-md group animate-in slide-in-from-right-4"
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{deal.name}</h4>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 group-hover:scale-105 ${getStageColor(deal.stage)}`}>
                        {deal.stage}
                      </div>
                    </div>
                    <p className="text-muted-foreground font-medium mb-2">{deal.company}</p>
                    <p className="text-sm text-muted-foreground mb-4">{deal.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-lg text-primary">{deal.value}</span>
                      <span className="text-sm font-medium text-muted-foreground">{deal.progress}%</span>
                    </div>
                    <Progress value={deal.progress} className="h-2 mb-4" />
                    <div className="flex gap-2">
                      <DealModal deal={deal} onSave={handleSaveDeal}>
                        <Button size="sm" variant="outline" className="group-hover:scale-105 transition-transform">
                          Edit
                        </Button>
                      </DealModal>
                      <Button size="sm" variant="ghost" className="group-hover:scale-105 transition-transform">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="ghost" className="group-hover:scale-105 transition-transform">
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

        {/* Enhanced Recent Activity */}
        <Card className="hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-6 delay-800">
          <CardHeader className="border-b bg-gradient-to-r from-blue-500/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
                <CardDescription>Stay updated with the latest CRM activities and interactions</CardDescription>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600 animate-pulse" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { color: "bg-green-500", title: "New contact added: Sarah Johnson", time: "2 minutes ago", icon: UserPlus },
                { color: "bg-blue-500", title: "Deal updated: Website Redesign moved to Proposal", time: "15 minutes ago", icon: Target },
                { color: "bg-orange-500", title: "Meeting scheduled with Enterprise Solutions", time: "1 hour ago", icon: Calendar },
                { color: "bg-purple-500", title: "Email campaign sent to 150 contacts", time: "3 hours ago", icon: Mail }
              ].map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div 
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-transparent hover:from-muted/50 hover:to-muted/10 transition-all duration-300 group animate-in slide-in-from-left-4"
                    style={{ animationDelay: `${900 + index * 100}ms` }}
                  >
                    <div className={`w-3 h-3 rounded-full ${activity.color} animate-pulse group-hover:scale-125 transition-transform`}></div>
                    <div className={`p-2 rounded-lg bg-muted group-hover:scale-110 transition-transform`}>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Floating Action Button */}
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
