"use client"

import { useEffect, useRef } from "react"

interface GlitchTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export function GlitchText({ text, className = "", style }: GlitchTextProps) {
  return (
    <span className={`glitch-wrapper ${className}`} style={style} data-text={text}>
      {text}
      <style jsx>{`
        .glitch-wrapper {
          position: relative;
          display: inline-block;
        }
        .glitch-wrapper::before,
        .glitch-wrapper::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-wrapper::before {
          color: #ff0000;
          animation: glitch-1 4.5s infinite linear;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-2px, 0);
          opacity: 0.7;
        }
        .glitch-wrapper::after {
          color: #cc0000;
          animation: glitch-2 4.5s infinite linear;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          transform: translate(2px, 0);
          opacity: 0.5;
        }
        @keyframes glitch-1 {
          0%, 88%, 100% { transform: translate(0); opacity: 0; }
          89% { transform: translate(-3px, 1px); opacity: 0.7; }
          90% { transform: translate(3px, -1px); opacity: 0.7; }
          91% { transform: translate(-1px, 2px); opacity: 0; }
          94% { transform: translate(-3px, 0); opacity: 0.7; }
          95% { transform: translate(0); opacity: 0; }
        }
        @keyframes glitch-2 {
          0%, 90%, 100% { transform: translate(0); opacity: 0; }
          91% { transform: translate(3px, -1px); opacity: 0.5; }
          92% { transform: translate(-3px, 1px); opacity: 0.5; }
          93% { transform: translate(0); opacity: 0; }
          96% { transform: translate(2px, 0); opacity: 0.5; }
          97% { transform: translate(0); opacity: 0; }
        }
      `}</style>
    </span>
  )
}
