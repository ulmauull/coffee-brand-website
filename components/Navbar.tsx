'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/product', label: 'Product' },
  { href: '/store-location', label: 'Store Location' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Menu Animation Variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as any } // custom ease
    },
    open: {
      opacity: 1,
      y: '0%',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }
    }
  };

  const linkVariants = {
    closed: { y: "100%", opacity: 0 },
    open: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.5, delay: 0.3 + (i * 0.1), ease: [0.76, 0, 0.24, 1] as any }
    })
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-6 py-6 z-50 flex justify-between items-center mix-blend-difference text-calf-white">
        <Link href="/" className="text-2xl font-bold tracking-tighter uppercase z-50">
          Calf
        </Link>

        <button 
            onClick={toggleMenu} 
            className="z-50 p-2 hover:opacity-70 transition-opacity"
            aria-label="Toggle Menu"
        >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-calf-dark text-calf-white z-40 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 text-center overflow-hidden">
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                    <motion.div
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <Link 
                            href={link.href} 
                            onClick={toggleMenu}
                            className="text-5xl md:text-7xl font-bold tracking-tighter hover:text-calf-blue transition-colors block"
                        >
                        {link.label}
                        </Link>
                    </motion.div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-10 text-sm opacity-50 space-x-4">
                <a href="#" className="hover:underline">Instagram</a>
                <a href="#" className="hover:underline">Twitter</a>
                <a href="#" className="hover:underline">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
