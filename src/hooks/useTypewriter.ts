import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 38, startDelay: number = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer: NodeJS.Timeout | null = null;
    let delayTimer: NodeJS.Timeout | null = null;

    // Reset state when text changes
    setDisplayed('');
    setDone(false);

    delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        if (index < text.length) {
          const char = text.charAt(index);
          setDisplayed((prev) => prev + char);
          index++;
        } else {
          setDone(true);
          if (timer) clearInterval(timer);
        }
      }, speed);
    }, startDelay);

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
