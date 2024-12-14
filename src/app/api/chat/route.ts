import { GoogleGenerativeAI } from '@google/generative-ai'
import { Message } from 'ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY is not configured')
    }

    const geminiMessages = messages.map((message: Message) => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }],
    }))

    const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const chat = geminiModel.startChat({
      history: geminiMessages.slice(0, -1),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    })

    const result = await chat.sendMessage(geminiMessages[geminiMessages.length - 1].parts[0].text)
    const response = await result.response
    const text = response.text()

    if (!text) {
      throw new Error('No response generated')
    }

    return new Response(JSON.stringify({ role: 'assistant', content: text }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in chat API:', error)
    return new Response(
      JSON.stringify({
        error: 'There was an error processing your request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

