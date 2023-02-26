import { useMessageStore } from "@/store/messages"
import ChatForm from "./chat-form"
import Message from "./message"

export default function Chat() {
  const messages = useMessageStore((state) => state.messages)

  return (
    <div className='flex flex-col h-full flex-1 pl-64'>
      <main>
        {messages.map((message) => (
          <Message key={message.id} ia={message.ia} message={message.message} />
        ))}
      </main>
      <ChatForm />
    </div>
  )
}