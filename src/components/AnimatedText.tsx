import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalCharacters = text.length;

  let runningCharIndex = 0;

  return (
    <p ref={elementRef} className={className} style={style}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const wordStartIndex = runningCharIndex;
        runningCharIndex += word.length + 1; // including the space

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em]">
            {wordChars.map((char, charIndex) => {
              const globalIndex = wordStartIndex + charIndex;
              const start = globalIndex / totalCharacters;
              const end = Math.min(1, start + (1 / totalCharacters) * 2.5);

              return (
                <Character
                  key={charIndex}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};
