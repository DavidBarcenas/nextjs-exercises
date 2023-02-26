import { create } from 'zustand'

interface Message {
  id: number
  ia: boolean
  message: string
}

interface StoreState {
  messages: Message[]
  sendPrompt: ({ prompt }: { prompt: string }) => Promise<void>
}

export const useMessageStore = create<StoreState>((set, get) => ({
  messages: [],

  sendPrompt: async ({ prompt }) => {
    const messageAIid = get().messages.length + 1

    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: state.messages.length,
          ia: false,
          message: prompt
        },
        {
          id: state.messages.length + 1,
          ia: true,
          message: ''
        }
      ]
    }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      })

      const json = await response.json()

      set((state) => ({
        messages: state.messages.map((item) => {
          if (item.id === messageAIid) {
            return {
              ...item,
              message: json.response
            }
          }
          return item
        })
      }))
    } catch (error) {
      console.error(error)
    }
  }
}))