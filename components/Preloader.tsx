'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000; // 2 seconds fake load
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    const timeout = setTimeout(() => {
        setIsLoading(false);
    }, duration + 500); // Wait a bit after 100%

    return () => {
        clearInterval(timer);
        clearTimeout(timeout);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-calf-dark text-calf-white"
        >
            <div className="text-9xl font-bold tracking-tighter">
                {Math.round(count)}%
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
