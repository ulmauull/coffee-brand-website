'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-calf-dark text-calf-white py-20 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div>
                <h2 className="text-9xl font-bold tracking-tighter leading-none">CALF</h2>
                <p className="mt-4 text-white/50 text-xl max-w-sm">Everyday coffee for everyone. Fresh, smooth, and balanced.</p>
            </div>
            <div className="flex flex-col gap-4 text-lg text-right">
                <Link href="/" className="hover:text-calf-blue transition-colors">Home</Link>
                <Link href="/product" className="hover:text-calf-blue transition-colors">Products</Link>
                <Link href="/store-location" className="hover:text-calf-blue transition-colors">Locations</Link>
                <a href="#" className="hover:text-calf-blue transition-colors">Contact</a>
            </div>
        </div>
        <div className="mt-20 pt-10 border-t border-white/10 flex justify-between text-sm text-white/40">
            <p>&copy; 2025 Calf Coffee. All rights reserved.</p>
            <p>Designed by Rizki Maulana</p>
        </div>
    </footer>
  );
}
