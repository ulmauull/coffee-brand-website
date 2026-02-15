'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'dark' | 'light';
}

export default function TextReveal({ children, className, theme = 'dark' }: TextRevealProps) {
  const element = useRef(null);
  const isInView = useInView(element, { margin: "-20% 0px -20% 0px", once: true });

  return (
    <motion.h2
      ref={element}
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
      className={cn(
        "text-4xl md:text-6xl font-bold tracking-tight",
        theme === 'light' ? "text-calf-white" : "text-calf-dark",
        className
      )}
    >
      {children}
    </motion.h2>
  );
}
