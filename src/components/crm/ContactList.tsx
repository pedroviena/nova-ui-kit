
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ContactModal } from "./ContactModal"
import { Phone, Mail, MoreHorizontal, Search, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: "hot" | "warm" | "cold"
  value: string
  notes?: string
  tags?: string[]
}

interface ContactListProps {
  contacts: Contact[]
  onUpdateContact: (contact: Contact) => void
  onDeleteContact: (id: string) => void
}

export function ContactList({ contacts, onUpdateContact, onDeleteContact }: ContactListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot": return "bg-red-500"
      case "warm": return "bg-yellow-500"
      case "cold": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Contacts ({filteredContacts.length})</CardTitle>
          <ContactModal onSave={onUpdateContact} />
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Contacts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("hot")}>
                Hot Leads
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("warm")}>
                Warm Leads
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("cold")}>
                Cold Leads
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || statusFilter !== "all" ? "No contacts match your filters" : "No contacts yet"}
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.company}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(contact.status)}`}></div>
                      <span className="text-xs text-muted-foreground capitalize">{contact.status} lead</span>
                      {contact.tags && contact.tags.length > 0 && (
                        <div className="flex gap-1">
                          {contact.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {contact.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{contact.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-2">
                    <p className="font-medium">{contact.value}</p>
                    <p className="text-xs text-muted-foreground">{contact.email}</p>
                  </div>
                  
                  <Button size="sm" variant="ghost">
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Mail className="h-3 w-3" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <ContactModal contact={contact} onSave={onUpdateContact}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          Edit Contact
                        </DropdownMenuItem>
                      </ContactModal>
                      <DropdownMenuItem 
                        onClick={() => onDeleteContact(contact.id)}
                        className="text-destructive"
                      >
                        Delete Contact
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
