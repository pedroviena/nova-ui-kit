
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Star,
  Heart,
  Download,
  Share,
  ArrowLeft,
  Home
} from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

const ComponentShowcase = () => {
  const [progress, setProgress] = useState(75)
  const [switchValue, setSwitchValue] = useState(false)
  const [radioValue, setRadioValue] = useState("option1")
  const { toast } = useToast()

  const showToast = () => {
    toast({
      title: "Toast notification",
      description: "This is a sample toast message with an action.",
    })
  }

  const componentSections = [
    {
      title: "Buttons",
      component: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled</Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              With Icon
            </Button>
          </div>
        </div>
      )
    },
    {
      title: "Form Elements",
      component: (
        <div className="space-y-6 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="select">Select Option</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="textarea">Message</Label>
            <Textarea id="textarea" placeholder="Enter your message" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch checked={switchValue} onCheckedChange={setSwitchValue} />
            <Label>Enable notifications</Label>
          </div>
          
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2">Option 2</Label>
            </div>
          </RadioGroup>
        </div>
      )
    },
    {
      title: "Cards & Content",
      component: (
        <div className="space-y-4">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>This is a card description that explains the content.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is the main content of the card. You can put any content here.
              </p>
            </CardContent>
          </Card>
          
          <Card className="max-w-md">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">John Doe</CardTitle>
                  <CardDescription>Software Engineer</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                "This is an amazing component library that has helped me build better UIs faster."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Badges & Progress",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Badges</h4>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Progress</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                  Decrease
                </Button>
                <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                  Increase
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Alerts & Notifications",
      component: (
        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This is an informational alert with an icon.
            </AlertDescription>
          </Alert>
          
          <Alert className="border-green-500 text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Success! Your action was completed successfully.
            </AlertDescription>
          </Alert>
          
          <Alert className="border-red-500 text-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error! Something went wrong. Please try again.
            </AlertDescription>
          </Alert>
          
          <Button onClick={showToast}>Show Toast</Button>
        </div>
      )
    },
    {
      title: "Tabs",
      component: (
        <Tabs defaultValue="tab1" className="max-w-md">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tab 1 Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the content for the first tab.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tab 2 Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the content for the second tab.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tab 3 Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the content for the third tab.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <Home className="h-4 w-4" />
                </Link>
              </Button>
              <div className="w-6 h-6 bg-primary rounded"></div>
              <span className="text-xl font-bold">Component Library</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">UI Component Showcase</h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive collection of reusable UI components built with React and Tailwind CSS
          </p>
        </div>

        <div className="grid gap-8">
          {componentSections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-2xl">{section.title}</CardTitle>
                <CardDescription>
                  Interactive examples of {section.title.toLowerCase()} components
                </CardDescription>
              </CardHeader>
              <CardContent>
                {section.component}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Documentation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Usage Documentation</CardTitle>
            <CardDescription>
              How to use these components in your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Installation</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>npm install @radix-ui/react-* tailwindcss class-variance-authority</code>
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Import Components</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"`}</code>
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Basic Usage</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`<Button variant="default" size="lg">
  Click me
</Button>

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ComponentShowcase
