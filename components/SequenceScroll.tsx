'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const FRAME_COUNT = 240;
const IMAGES_FOLDER = '/sequence'; // Path to images
const FILENAME_PREFIX = 'ezgif-frame-';
const FILENAME_SUFFIX = '.png';

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  // Text Global Opacity - Fade out everything at the very end to let next section take over
  const contentOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

  // 0% - Start
  const opacityStart = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const scaleStart = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const blurStart = useTransform(scrollYProgress, [0, 0.2], ["0px", "10px"]);

  // 30% - Left
  const opacityLeft = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
  const xLeft = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [-50, 0, -50]);

  // 60% - Right
  const opacityRight = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const xRight = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [50, 0, 50]);

  // 90% - End CTA
  const opacityEnd = useTransform(scrollYProgress, [0.8, 0.9, 0.98], [0, 1, 1]);
  const scaleEnd = useTransform(scrollYProgress, [0.8, 0.9], [0.8, 1]);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const frameNumber = i.toString().padStart(3, '0');
        img.src = `${IMAGES_FOLDER}/${FILENAME_PREFIX}${frameNumber}${FILENAME_SUFFIX}`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === FRAME_COUNT) {
                setIsLoaded(true);
            }
        };
        imgs.push(img);
    }
    setImages(imgs);
  }, []);

  // Draw to Canvas
  const render = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index - 1]; // 0-based index
    if (!img) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    // Cover Fit Logic
    const canvasRatio = window.innerWidth / window.innerHeight;
    const imgRatio = img.width / img.height;
    
    let drawWidth = window.innerWidth;
    let drawHeight = window.innerHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
        // Canvas is wider than image
        drawWidth = window.innerWidth;
        drawHeight = window.innerWidth / imgRatio;
        offsetY = (window.innerHeight - drawHeight) / 2;
    } else {
        // Canvas is taller than image
        drawHeight = window.innerHeight;
        drawWidth = window.innerHeight * imgRatio;
        offsetX = (window.innerWidth - drawWidth) / 2;
    }
    
    // Clear & Draw
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(currentIndex, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;
    const frameIndex = Math.min(FRAME_COUNT, Math.max(1, Math.floor(latest)));
    requestAnimationFrame(() => render(frameIndex));
  });
  
  // Initial render when loaded
  useEffect(() => {
      if (isLoaded) {
          render(1);
      }
  }, [isLoaded]);

  // Handle Resize
  useEffect(() => {
      const handleResize = () => {
          if (isLoaded) render(Math.floor(currentIndex.get()));
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-calf-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Placeholder Loading State */}
        {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-calf-white text-calf-mocha z-20">
                <p className="text-xl font-medium animate-pulse">Brewing...</p>
            </div>
        )}
        <canvas 
            ref={canvasRef} 
            className="block h-full w-full object-cover"
        />

        {/* Text Overlays */}
        <motion.div style={{ opacity: contentOpacity }} className="absolute inset-0 pointer-events-none z-10">
            
            {/* 0% Start */}
            <motion.div 
                style={{ opacity: opacityStart, scale: scaleStart, filter: blurStart }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
            >
                <h1 className="text-[12vw] leading-none font-bold tracking-tighter text-calf-dark">CALF COFFEE</h1>
                <p className="text-2xl md:text-3xl text-calf-mocha mt-4 font-light">Fresh. Smooth. Everyday Coffee.</p>
            </motion.div>

            {/* 30% Left */}
            <motion.div 
                style={{ opacity: opacityLeft, x: xLeft }}
                className="absolute inset-0 flex items-center justify-start p-10 md:p-20"
            >
                <h2 className="text-5xl md:text-7xl font-bold max-w-2xl text-calf-dark leading-tight">
                    Brewed with Selected <span className="text-calf-mocha">Arabica Beans</span>
                </h2>
            </motion.div>

            {/* 60% Right */}
            <motion.div 
                style={{ opacity: opacityRight, x: xRight }}
                className="absolute inset-0 flex items-center justify-end p-10 md:p-20 text-right"
            >
                <h2 className="text-5xl md:text-7xl font-bold max-w-2xl text-calf-dark leading-tight">
                    Perfect Balance of <br/> <span className="text-calf-blue">Milk</span> and Espresso
                </h2>
            </motion.div>

             {/* 90% CTA */}
             <motion.div 
                style={{ opacity: opacityEnd, scale: scaleEnd }}
                className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-auto"
            >
                <h2 className="text-6xl md:text-8xl font-bold text-calf-dark mb-8">Try Calf Today</h2>
                <a href="#products" className="group relative inline-flex items-center justify-center px-8 py-4 bg-calf-dark text-calf-white rounded-full text-lg font-medium overflow-hidden transition-all hover:scale-105">
                    <span className="relative z-10 flex items-center gap-2">
                        View Products <ArrowRight size={20} />
                    </span>
                    <div className="absolute inset-0 bg-calf-mocha scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </a>
            </motion.div>

        </motion.div>
      </div>
      
      {/* Scroll Triggers for overlays can go here or be passed as children */}
    </div>
  );
}
