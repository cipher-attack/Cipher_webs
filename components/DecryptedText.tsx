import React, { useEffect, useState } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

interface Props {
  text: string;
  className?: string;
  speed?: number;
}

export const DecryptedText: React.FC<Props> = ({ text, className, speed = 50 }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let interval: any;
    let iteration = 0;

    const startScramble = () => {
      interval = setInterval(() => {
        setDisplayText(prev => 
          text.split('').map((char, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, speed);
    };

    startScramble();

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{displayText}</span>;
};
