'use client'

import { useChat } from 'ai/react'
import { Bot, SendHorizontal, User, AlertCircle } from 'lucide-react'
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
      {/* Chat Container */}
      <div className="w-full max-w-2xl h-[600px] grid grid-rows-[auto_1fr_auto] bg-white shadow-lg rounded-lg border">

        {/* Card Header */}
        <div className="border-b p-4 flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <span className="text-lg font-semibold text-gray-800">Gemini AI Chat</span>
        </div>

        {/* Card Content */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="h-full pr-4 overflow-y-auto">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-500 text-white p-3 mb-4 rounded-md flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Messages */}
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                      }`}
                  >
                    {/* User/Assistant Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'assistant' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                        }`}
                    >
                      {message.role === 'assistant' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    {/* Message Content */}
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[85%] ${message.role === 'assistant'
                          ? 'bg-gray-200 text-gray-800'
                          : 'bg-blue-500 text-white'
                        }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Start a conversation by sending a message below.
              </div>
            )}
          </div>
        </div>

        {/* Card Footer */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            {/* Input Field */}
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
              className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-500"
            />
            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300"
            >
              <SendHorizontal className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
