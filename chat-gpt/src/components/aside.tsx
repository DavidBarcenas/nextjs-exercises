import { PlusIcon } from "./icons";

export default function Aside() {
  return (
    <aside className='bg-gptdarkgray fixed flex w-64 h-screen flex-col'>
      <nav className='flex flex-col flex-1 h-full p-2 space-y-1'>
        <button className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20'>
          <PlusIcon /> New chat
        </button>
      </nav>
    </aside>
  )
}