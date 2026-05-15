"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/*=+_#%$";

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

type CipherTextProps = {
  text: string;
  className?: string;
  play?: boolean;
  duration?: number;
  delay?: number;
  mode?: "decode" | "encode";
};

export default function CipherText({
  text,
  className,
  play = true,
  duration = 1100,
  delay = 0,
  mode = "decode",
}: CipherTextProps) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(mode === "encode" ? text : "");
  const staticText = mode === "decode" ? text : "";

  useEffect(() => {
    if (!play || reducedMotion) {
      return;
    }

    const source = Array.from(text);
    const totalSteps = Math.max(18, Math.floor(duration / 32));
    let step = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        step += 1;
        const next = source
          .map((char, index) => {
            if (char === " ") return " ";
            const progressIndex = Math.floor((index / Math.max(source.length - 1, 1)) * totalSteps * 0.72) + 1;

            if (mode === "decode") {
              if (step >= progressIndex) return char;
              return randomGlyph();
            }

            const encodeThreshold = totalSteps - progressIndex;
            if (step <= encodeThreshold) return char;
            return randomGlyph();
          })
          .join("");

        setDisplay(step >= totalSteps ? (mode === "decode" ? text : source.map((char) => (char === " " ? " " : randomGlyph())).join("")) : next);

        if (step >= totalSteps && interval) {
          clearInterval(interval);
        }
      }, 28);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [delay, duration, mode, play, reducedMotion, text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{!play || reducedMotion ? staticText : display || text}</span>
    </span>
  );
}
