
import { DashboardLayout } from "@/components/shared/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  UserPlus, 
  Target, 
  Calendar,
  Phone,
  Mail,
  MoreHorizontal
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"

const CRMDashboard = () => {
  const stats = [
    { title: "Total Contacts", value: "2,431", icon: Users, color: "text-blue-600" },
    { title: "New Leads", value: "142", icon: UserPlus, color: "text-green-600" },
    { title: "Deals Closed", value: "23", icon: Target, color: "text-purple-600" },
    { title: "Meetings Today", value: "8", icon: Calendar, color: "text-orange-600" },
  ]

  const salesData = [
    { month: "Jan", leads: 45, deals: 12 },
    { month: "Feb", leads: 52, deals: 15 },
    { month: "Mar", leads: 38, deals: 8 },
    { month: "Apr", leads: 61, deals: 18 },
    { month: "May", leads: 42, deals: 14 },
    { month: "Jun", leads: 55, deals: 16 },
  ]

  const contacts = [
    {
      name: "Sarah Johnson",
      email: "sarah@company.com",
      phone: "+1 (555) 123-4567",
      company: "TechCorp Inc.",
      status: "hot",
      value: "$45,000"
    },
    {
      name: "Michael Chen",
      email: "michael@startup.io",
      phone: "+1 (555) 987-6543",
      company: "StartupXYZ",
      status: "warm",
      value: "$23,000"
    },
    {
      name: "Emily Davis",
      email: "emily@enterprise.com",
      phone: "+1 (555) 456-7890",
      company: "Enterprise Solutions",
      status: "cold",
      value: "$67,000"
    },
    {
      name: "David Wilson",
      email: "david@innovate.com",
      phone: "+1 (555) 321-0987",
      company: "Innovate Labs",
      status: "hot",
      value: "$34,000"
    }
  ]

  const deals = [
    { name: "Website Redesign", company: "TechCorp", value: "$45,000", stage: "Proposal", progress: 75 },
    { name: "Mobile App Dev", company: "StartupXYZ", value: "$23,000", stage: "Negotiation", progress: 60 },
    { name: "Cloud Migration", company: "Enterprise", value: "$67,000", stage: "Discovery", progress: 25 },
    { name: "AI Integration", company: "Innovate Labs", value: "$34,000", stage: "Closed Won", progress: 100 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot": return "bg-red-500"
      case "warm": return "bg-yellow-500"
      case "cold": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Discovery": return "bg-blue-100 text-blue-800"
      case "Proposal": return "bg-yellow-100 text-yellow-800"
      case "Negotiation": return "bg-orange-100 text-orange-800"
      case "Closed Won": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout title="CRM Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
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
                  <Bar dataKey="leads" fill="hsl(var(--primary))" />
                  <Bar dataKey="deals" fill="hsl(var(--muted))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common CRM tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Contact
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="mr-2 h-4 w-4" />
                Create Deal
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Email Campaign
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contacts and Deals */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Contacts</CardTitle>
              <CardDescription>Latest added contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.company}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(contact.status)}`}></div>
                          <span className="text-xs text-muted-foreground">{contact.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{contact.value}</p>
                      <div className="flex space-x-1 mt-1">
                        <Button size="sm" variant="ghost">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Deals</CardTitle>
              <CardDescription>Deals in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deals.map((deal, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{deal.name}</h4>
                      <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{deal.company}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{deal.value}</span>
                      <span className="text-sm text-muted-foreground">{deal.progress}%</span>
                    </div>
                    <Progress value={deal.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CRMDashboard
