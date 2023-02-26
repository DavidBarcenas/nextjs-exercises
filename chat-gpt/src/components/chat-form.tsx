import { useMessageStore } from '@/store/messages'
import { FormEvent, useRef } from 'react'
import { SendIcon } from './icons'

export default function ChatForm() {
  const sendPrompt = useMessageStore((state) => state.sendPrompt)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement> | undefined) => {
    event?.preventDefault()
    if (textAreaRef.current) {
      const { value } = textAreaRef.current
      sendPrompt({ prompt: value })
      textAreaRef.current.value = ''
    }
  }

  const handleChange = () => {
    const el = textAreaRef.current
    if (el) {
      el.style.height = '0px'
      const scrollHeight = el?.scrollHeight
      el.style.height = scrollHeight + 'px'
    }
  }

  const handleKeyDown = (e: any) => {
    if (e?.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(undefined)
    }
  }

  return (
    <section className='absolute bottom-0 w-full left-0 right-0 ml-32'>
      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className='flex flex-row max-w-3xl pt-6 m-auto mb-6'
      >
        <div className='relative flex flex-col flex-grow w-full px-4 py-3 text-white border rounded-md shadow-lg bg-gptlightgray border-gray-900/50'>
          <textarea
            ref={textAreaRef}
            rows={1}
            tabIndex={0}
            autoFocus
            defaultValue=''
            onChange={handleChange}
            className='w-full h-[24px] resize-none bg-transparent m-0 border-0 outline-none'
          />
          <button className='absolute p-1 rounded-md bottom-2.5 right-2.5'>
            <SendIcon />
          </button>
        </div>
      </form>
    </section>
  )
}