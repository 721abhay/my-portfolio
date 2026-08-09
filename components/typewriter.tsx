"use client"

import { useEffect, useState } from "react"

interface TypewriterProps {
  words: string[]
  className?: string
  speed?: number
  deleteSpeed?: number
  pauseMs?: number
}

export function Typewriter({ words, className = "", speed = 80, deleteSpeed = 40, pauseMs = 1800 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("")
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  // Typing logic
  useEffect(() => {
    const current = words[wordIdx % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseMs)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed)
      } else {
        setIsDeleting(false)
        setWordIdx(i => i + 1)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIdx, words, speed, deleteSpeed, pauseMs])

  return (
    <span className={className}>
      {displayed}
      <span
        className="ml-0.5 inline-block w-0.5 h-[1em] bg-red-500 align-middle"
        style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}
      />
    </span>
  )
}
