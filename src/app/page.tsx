'use client'

import { useState, useCallback } from 'react'
import { Bot, SendHorizontal, User, Loader, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Footer } from '@/components/footer'
import { Logo } from '@/components/logo'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    setLoading(true)
    setError(null)

    const newMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, newMessage])
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
    } catch (error) {
      console.error('Chat error:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  return (
    <div className="flex flex-col min-h-screen bg-[#1e1e1e] text-[#d4d4d4]">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Logo />
        <Card className="w-full max-w-2xl h-[600px] grid grid-rows-[auto_1fr_auto] bg-[#252526] border-[#3e3e42]">
          <CardHeader className="border-b border-[#3e3e42]">
            <CardTitle className="text-[#d4d4d4]">Gemini AI Chat</CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden p-0">
            <ScrollArea className="h-full">
              <div className="space-y-4 p-4">
                {error && (
                  <Alert variant="destructive" className="mb-4 bg-[#5a1d1d] border-[#842727] text-[#ffa4a4]">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'assistant' 
                          ? 'bg-[#264f78] text-[#d4d4d4]' 
                          : 'bg-[#4d4d4d] text-[#d4d4d4]'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-md px-3 py-2 max-w-[85%] ${
                        message.role === 'assistant'
                          ? 'bg-[#2d2d2d] text-[#d4d4d4] border border-[#3e3e42]'
                          : 'bg-[#0e639c] text-[#ffffff] border border-[#1177bb]'
                      }`}
                    >
                      <pre className="whitespace-pre-wrap font-mono text-sm">
                        {message.content}
                      </pre>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center justify-center">
                    <Loader className="w-6 h-6 animate-spin text-[#0e639c]" />
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t border-[#3e3e42]">
            <form onSubmit={handleSubmit} className="w-full flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                disabled={loading}
                className="bg-[#3c3c3c] border-[#3e3e42] text-[#d4d4d4] placeholder:text-[#808080]"
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-[#0e639c] text-[#ffffff] hover:bg-[#1177bb] transition-colors"
              >
                <SendHorizontal className="w-4 h-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

