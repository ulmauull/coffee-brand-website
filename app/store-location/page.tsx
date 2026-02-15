'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { useState } from "react";

const locations = [
    {
        id: 1,
        name: "Kopi Calf To Go Kelapa Gading",
        address: "Jl. Kelapa Cengkir Raya No.23, Klp. Gading Tim., Kec. Klp. Gading",
        hours: "08.00 – 22.00",
        phone: "+62 21 555 0123",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15865.288797618994!2d106.8254792!3d-6.2211764!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f370b33d802f%3A0x14dd69bba393b749!2sKopi%20Calf%20To%20Go%20Setiabudi%20dr.%20Satrio!5e0!3m2!1sid!2sid!4v1770000812856!5m2!1sid!2sid"
    },
    {
        id: 2,
        name: "Kopi Calf To Go Tanjung Duren",
        address: "Jl. Tanjung Duren Utara No. 12, Tanjung Duren",
        hours: "09.00 – 23.00",
        phone: "+62 22 555 0456",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15866.869206672092!2d106.7793957!3d-6.1685971!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f79a86f8cfe9%3A0x54d1f8711f0edcda!2sKopi%20Calf%20To%20Go%20Tanjung%20Duren!5e0!3m2!1sid!2sid!4v1770000878091!5m2!1sid!2sid"
    },
    {
        id: 3,
        name: "Kopi Calf To Go Depok",
        address: "Jl. Margonda Raya No. 12, Depok",
        hours: "08.00 – 21.00",
        phone: "+62 31 555 0789",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15861.194457482005!2d106.8512818!3d-6.355377700000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed4a2e184845%3A0x1eee4f9a96aca4a!2sKopi%20Calf%20To%20Go%20Kelapa%20Dua%20Depok!5e0!3m2!1sen!2sus!4v1770000933310!5m2!1sen!2sus"
    }
];

export default function StoreLocationPage() {
    const [selectedLocation, setSelectedLocation] = useState(locations[0]); // Default lokasi pertama

    return (
        <main className="min-h-screen bg-calf-white">
            <Navbar />
            
            <section className="pt-40 pb-20 px-6 md:px-20">
                 <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter text-calf-dark mb-10 text-center"
                >
                    Find Calf Near You
                </motion.h1>

                <div className="flex flex-col md:flex-row gap-10 mt-20">
                    {/* List */}
                    <div className="w-full md:w-1/3 flex flex-col gap-6">
                        {locations.map((loc, i) => (
                            <motion.div 
                                key={loc.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                onClick={() => setSelectedLocation(loc)} // Klik untuk ganti map
                                className={`p-8 rounded-2xl transition-all cursor-pointer ${
                                    selectedLocation.id === loc.id 
                                        ? 'bg-calf-dark text-calf-white' // Active state
                                        : 'bg-neutral-100 hover:bg-neutral-200' // Inactive state
                                }`}
                            >
                                <h3 className="text-2xl font-bold mb-4">{loc.name}</h3>
                                <div className={`space-y-2 ${selectedLocation.id === loc.id ? 'text-calf-white/80' : 'text-neutral-600'}`}>
                                    <div className="flex items-center gap-3">
                                        <MapPin size={18} />
                                        <span>{loc.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock size={18} />
                                        <span>{loc.hours}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone size={18} />
                                        <span>{loc.phone}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Map - Berubah sesuai lokasi yang dipilih */}
                    <div className="w-full md:w-2/3 min-h-[500px] bg-neutral-200 rounded-3xl overflow-hidden relative">
                         <iframe 
                            key={selectedLocation.id} // Penting! Agar iframe refresh saat ganti lokasi
                            src={selectedLocation.mapUrl} // Gunakan mapUrl dari selectedLocation
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

             <Footer />
        </main>
    );
}