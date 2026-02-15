'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const products = [
    {
        id: 1,
        name: "Calf Premium",
        desc: "Classic blend of espresso and fresh milk",
        price: "Rp. 25.000",
        color: "bg-calf-mocha/20",
        image: "/img/premium.jpg"  // Tambahkan ini
    },
    {
        id: 2,
        name: "Calf Brew Malt",
        desc: "Sweet caramel meets bold coffee",
        price: "Rp. 33.000",
        color: "bg-orange-100",
        image: "/img/brew.png"  // Tambahkan ini
    },
    {
        id: 3,
        name: "Caramel Macchiato",
        desc: "Smooth matcha with creamy milk",
        price: "Rp. 30.000",
        color: "bg-green-100",
        image: "/img/caramel.png"  // Tambahkan ini
    },
    {
        id: 4,
        name: "Calf Smooth Caramel Butterscotch",
        desc: "Strong and bold espresso taste",
        price: "Rp. 35.000",
        color: "bg-stone-200",
        image: "/img/butter.png"  // Tambahkan ini
    }
];

export default function ProductPage() {
    return (
        <main className="min-h-screen bg-calf-white">
            <Navbar />
            
            <section className="pt-40 pb-20 px-6 md:px-20">
                <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter text-calf-dark mb-20 text-center"
                >
                    Our Signature Drinks
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {products.map((product, i) => (
                        <motion.div 
                            key={product.id}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="group relative cursor-pointer"
                        >
                            <div className={`aspect-square ${product.color} rounded-3xl overflow-hidden mb-6 transition-transform duration-500 group-hover:scale-[0.98] relative`}>
                                {/* Ganti bagian ini */}
                                <img 
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold text-calf-dark">{product.name}</h2>
                                    <p className="text-xl text-neutral-500 mt-2">{product.desc}</p>
                                </div>
                                <span className="text-2xl font-bold text-calf-dark">{product.price}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
