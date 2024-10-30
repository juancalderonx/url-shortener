"use client"

import * as React from "react"
import {
  Bell,
  Link as LinkIcon,
  LogOut,
  Plus,
  Settings,
  User,
  MoreVertical,
  Pencil,
  Trash2,
  BarChart2,
  Link
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Login } from "./login"
import { Signup } from "./signup"

interface ShortenedUrl {
  id: string
  original: string
  shortened: string
}

export function UrlShortenerDashboard() {
  const [url, setUrl] = React.useState("")
  const [shortenedUrls, setShortenedUrls] = React.useState<ShortenedUrl[]>([
    { id: "1", original: "https://example.com/very-long-url", shortened: "https://short.url/abc123" },
    { id: "2", original: "https://another-example.com/another-long-url", shortened: "https://short.url/def456" },
  ])
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [showLogin, setShowLogin] = React.useState(true)
  const [selectedUrlForMetrics, setSelectedUrlForMetrics] = React.useState<string | null>(null)
  const [editingUrl, setEditingUrl] = React.useState<ShortenedUrl | null>(null)

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault()
    if (url) {
      const newShortenedUrl: ShortenedUrl = {
        id: Math.random().toString(36).substr(2, 9),
        original: url,
        shortened: `https://short.url/${Math.random().toString(36).substr(2, 6)}`,
      }
      setShortenedUrls([newShortenedUrl, ...shortenedUrls])
      setUrl("")
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleSignup = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowLogin(true)
  }

  const handleViewMetrics = (shortenedUrl: string) => {
    setSelectedUrlForMetrics(shortenedUrl)
    // Here you would typically fetch the metrics data for the selected URL
    console.log(`Viewing metrics for: ${shortenedUrl}`)
  }

  const handleRemoveUrl = (id: string) => {
    setShortenedUrls(shortenedUrls.filter(url => url.id !== id))
  }

  const handleEditUrl = (url: ShortenedUrl) => {
    setEditingUrl(url)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingUrl) {
      setShortenedUrls(shortenedUrls.map(url => 
        url.id === editingUrl.id ? editingUrl : url
      ))
      setEditingUrl(null)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        {showLogin ? (
          <Login onLogin={handleLogin} onSwitchToSignup={() => setShowLogin(false)} />
        ) : (
          <Signup onSignup={handleSignup} onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar className="flex flex-col justify-between">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">John Doe</span>
                    <span className="text-xs text-muted-foreground">john@example.com</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            {/* This section can remain empty or you can add other content here */}
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#" className="flex items-center">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="font-semibold">URL Shortener Dashboard</h1>
              </div>
              <Button size="icon" variant="ghost">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total URLs Shortened</CardTitle>
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{shortenedUrls.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Shorten a URL</CardTitle>
                  <CardDescription>Enter a long URL to create a shortened version.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShorten} className="flex space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="url" className="sr-only">
                        URL
                      </Label>
                      <Input
                        id="url"
                        placeholder="Enter your URL here"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                    <Button type="submit">
                      <Plus className="mr-2 h-4 w-4" />
                      Shorten
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Your Shortened URLs</CardTitle>
                  <CardDescription>A list of URLs you&#39;ve shortened recently.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {shortenedUrls.map((item) => (
                      <div key={item.id} className="flex items-center justify-between space-x-4">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{item.shortened}</p>
                          <p className="text-sm text-muted-foreground">{item.original}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(item.shortened)}>
                            <LinkIcon className="h-4 w-4" />
                            <span className="sr-only">Copy link</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewMetrics(item.shortened)}>
                                <BarChart2 className="mr-2 h-4 w-4" />
                                View Metrics
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditUrl(item)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRemoveUrl(item.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All
                  </Button>
                </CardFooter>
              </Card>
              {selectedUrlForMetrics && (
                <Card>
                  <CardHeader>
                    <CardTitle>URL Metrics</CardTitle>
                    <CardDescription>Metrics for: {selectedUrlForMetrics}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>Total Clicks: 42</p>
                      <p>Unique Visitors: 38</p>
                      <p>Top Referrer: example.com</p>
                      <p>Last Click: 2 hours ago</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => setSelectedUrlForMetrics(null)}>Close Metrics</Button>
                  </CardFooter>
                </Card>
              )}
              {editingUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Edit URL</CardTitle>
                    <CardDescription>Edit the details of your shortened URL</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveEdit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-original">Original URL</Label>
                        <Input
                          id="edit-original"
                          value={editingUrl.original}
                          onChange={(e) => setEditingUrl({...editingUrl, original: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-shortened">Shortened URL</Label>
                        <Input
                          id="edit-shortened"
                          value={editingUrl.shortened}
                          onChange={(e) => setEditingUrl({...editingUrl, shortened: e.target.value})}
                        />
                      </div>
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}