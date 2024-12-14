'use client'

import { useChat } from 'ai/react'
import { Bot, SendHorizontal, User, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from 'react'

export default function ChatPage() {
  const [error, setError] = useState<string | null>(null)
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    onError: (error) => {
      console.error('Chat error:', error)
      setError('An error occurred while chatting. Please try again.')
    },
    onResponse: (response) => {
      setError(null)
      console.log('Response status:', response.status)
      if (!response.ok) {
        response.json().then(data => {
          console.error('Error details:', data)
          setError(data.error || 'An unknown error occurred')
        })
      }
    }
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-2xl h-[600px] grid grid-rows-[auto_1fr_auto]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6" />
            Gemini AI Chat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-full pr-4">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[85%] ${
                        message.role === 'assistant'
                          ? 'bg-muted'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Start a conversation by sending a message below.
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <SendHorizontal className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

