import { useEffect, useState } from 'react'

export function TypingEffect({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!text?.length) return

    const randomTime = Math.floor(Math.random() * 20) + 5
    const intervalId = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(intervalId)
        setShowCursor(false)
        return
      }

      const nextIndex = text.indexOf(' ', currentIndex + 1)
      if (nextIndex < 0) {
        setDisplayText(text)
        setCurrentIndex(text.length)
        return
      }

      setDisplayText(text.slice(0, nextIndex))
      setCurrentIndex(currentIndex + 1)
    }, randomTime)

    return () => clearInterval(intervalId)
  }, [text, currentIndex])

  return (
    <span
      className={`${
        showCursor ? 'after:content-["▋"] after:ml-1 after:animate-typing' : ''
      }`}
      dangerouslySetInnerHTML={{ __html: displayText }}
    />
  )
}