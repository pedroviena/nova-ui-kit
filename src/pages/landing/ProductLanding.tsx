
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { 
  Star, 
  Download, 
  Smartphone, 
  Monitor, 
  Tablet,
  ArrowRight,
  CheckCircle,
  Play,
  Menu,
  Users,
  TrendingUp,
  Shield
} from "lucide-react"
import { Link } from "react-router-dom"

const ProductLanding = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Optimized for mobile devices with native app performance"
    },
    {
      icon: Monitor,
      title: "Desktop Ready",
      description: "Full-featured desktop experience with advanced capabilities"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "End-to-end encryption with privacy-first design"
    },
    {
      icon: TrendingUp,
      title: "Analytics Built-in",
      description: "Track your progress with detailed insights and reports"
    }
  ]

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9", label: "App Store Rating" },
    { value: "24/7", label: "Support" }
  ]

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Software Engineer",
      content: "This app has completely changed how I manage my daily tasks. The interface is intuitive and the features are exactly what I needed.",
      rating: 5,
      avatar: "AR"
    },
    {
      name: "Maya Patel",
      role: "Product Designer",
      content: "Beautiful design and seamless functionality. I've recommended this to my entire team and they all love it too.",
      rating: 5,
      avatar: "MP"
    },
    {
      name: "James Wong",
      role: "Startup Founder",
      content: "The best productivity app I've ever used. It's helped me stay organized and focus on what matters most.",
      rating: 5,
      avatar: "JW"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg"></div>
              <span className="text-xl font-bold">ProductX</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#download" className="text-muted-foreground hover:text-foreground transition-colors">Download</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button asChild>
                <Link to="#download">Download App</Link>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <Badge className="mb-6" variant="secondary">
              🎉 Version 2.0 Now Available
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The productivity app you've been waiting for
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Streamline your workflow, boost your productivity, and achieve your goals faster with our revolutionary productivity platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Free
              </Button>
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Free download • No credit card required • Available on all platforms
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-8">
              <div className="bg-background rounded-2xl p-6 shadow-2xl">
                <div className="h-64 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Smartphone className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">App Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful features for modern productivity</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay organized, focused, and productive in one beautiful app
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Available on all your devices
          </h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Download our app and sync your data across all platforms seamlessly
          </p>
          
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="bg-primary-foreground text-primary hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <Smartphone className="h-12 w-12 mx-auto mb-4" />
                <CardTitle>Mobile App</CardTitle>
                <CardDescription className="text-muted-foreground">
                  iOS and Android
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="default">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground text-primary hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <Monitor className="h-12 w-12 mx-auto mb-4" />
                <CardTitle>Desktop App</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Windows, Mac, Linux
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="default">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground text-primary hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <Tablet className="h-12 w-12 mx-auto mb-4" />
                <CardTitle>Web App</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Any browser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="default">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Open App
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What our users are saying</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied users who have transformed their productivity
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "{testimonial.content}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already transformed their workflow with our app
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Free
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded"></div>
                <span className="font-bold">ProductX</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Revolutionizing productivity, one user at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Download</a></li>
                <li><a href="#" className="hover:text-foreground">Updates</a></li>
                <li><a href="#" className="hover:text-foreground">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">Bug Reports</a></li>
                <li><a href="#" className="hover:text-foreground">Feature Requests</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 ProductX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProductLanding
