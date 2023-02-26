import { ChatGPTLogo } from "./icons";

export function Avatar({ isAI }: { isAI: boolean }) {
  return (
    <figure
      className={`w-[30px] h-[30px] flex items-center justify-center rounded-sm ${
        isAI ? 'bg-gptlogo' : 'bg-blue-400'
      }`}
    >
      <ChatGPTLogo />
    </figure>
  )
}