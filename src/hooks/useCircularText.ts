import { useEffect, useRef } from 'react';

interface UseCircularTextOptions {
  rotationAngle?: number;
}

export function useCircularText(options: UseCircularTextOptions = {}) {
  const textRef = useRef<HTMLDivElement>(null);
  const { rotationAngle = 8 } = options;

  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current;
      const originalText = text.innerText;
      text.innerHTML = originalText
        .split("")
        .map((char, i) => `<span style="transform:rotate(${i * rotationAngle}deg)">${char}</span>`)
        .join("");
    }
  }, [rotationAngle]);

  return textRef;
}