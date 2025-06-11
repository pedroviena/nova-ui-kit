
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { BarChart3, Users, CreditCard, Zap, ShoppingBag, Layers } from "lucide-react"

const Index = () => {
  const sections = [
    {
      title: "Dashboards",
      description: "Professional admin interfaces with analytics and data visualization",
      icon: BarChart3,
      items: [
        { name: "Admin Dashboard", path: "/dashboards/admin", desc: "Complete admin interface with metrics and charts" },
        { name: "CRM Dashboard", path: "/dashboards/crm", desc: "Customer relationship management interface" },
        { name: "Finance Dashboard", path: "/dashboards/finance", desc: "Financial analytics and KPI tracking" }
      ]
    },
    {
      title: "Authentication",
      description: "Modern authentication flows with validation and error handling",
      icon: Users,
      items: [
        { name: "Login", path: "/auth/login", desc: "Clean login interface with form validation" },
        { name: "Register", path: "/auth/register", desc: "User registration with terms acceptance" },
        { name: "Password Recovery", path: "/auth/recover", desc: "Password reset flow with email verification" }
      ]
    },
    {
      title: "Landing Pages",
      description: "Converting landing pages for different business models",
      icon: Zap,
      items: [
        { name: "SaaS Landing", path: "/landing/saas", desc: "Modern SaaS product landing page" },
        { name: "Product Landing", path: "/landing/product", desc: "Product showcase with features and pricing" }
      ]
    },
    {
      title: "E-commerce",
      description: "Complete shopping experience with cart and checkout",
      icon: ShoppingBag,
      items: [
        { name: "Product Catalog", path: "/ecommerce/catalog", desc: "Product grid with filtering and search" },
        { name: "Checkout", path: "/ecommerce/checkout", desc: "Complete checkout flow with payment" }
      ]
    },
    {
      title: "Components",
      description: "Reusable UI components library",
      icon: Layers,
      items: [
        { name: "Component Showcase", path: "/components", desc: "All available UI components and patterns" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-primary rounded-lg"></div>
            <h1 className="text-2xl font-bold">NovaKit UI</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Complete UI Kit
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Professional dashboards, authentication flows, landing pages, e-commerce components, 
            and a complete UI component library built with React and Tailwind CSS.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/components">Explore Components</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboards/admin">View Dashboards</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      className="block p-3 rounded-lg border border-muted hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 group"
                    >
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {item.name}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 NovaKit UI. Built with React, Tailwind CSS, and shadcn/ui.</p>
        </div>
      </footer>
    </div>
  )
}

export default Index
