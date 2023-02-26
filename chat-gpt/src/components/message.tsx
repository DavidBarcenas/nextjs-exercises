import { Avatar } from "./avatar"
import { TypingEffect } from "./typing-effect"

export default function Message({
  ia,
  message
}: {
  ia: boolean
  message: string
}) {
  const textElement = ia ? <TypingEffect text={message} /> : message

  return (
    <div className={`${ia ? 'bg-gptlightgray' : 'bg-gptgray'}`}>
      <article className='flex gap-4 p-6 m-auto max-w-3xl'>
        <Avatar isAI={ia} />
        <div className='min-h-[20px] flex flex-1 flex-col items-start whitespace-pre-wrap'>
          <div className='prose-invert w-full break-words'>
            <p>{textElement}</p>
          </div>
        </div>
      </article>
    </div>
  )
}