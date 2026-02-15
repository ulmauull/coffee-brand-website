import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import Preloader from "@/components/Preloader";
import TextReveal from "@/components/TextReveal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-calf-white min-h-screen">
      <Preloader />
      <Navbar />
      
      {/* Hero Section with Scrollytelling */}
      <section className="relative z-10 w-full">
        <SequenceScroll />
      </section>

      {/* Post-Hero Content Overlapping the end of sequence */}
      <div className="relative z-20 -mt-[100vh] bg-calf-white rounded-t-[3rem] shadow-2xl overflow-hidden">
        
        {/* About Section */}
        <section className="min-h-screen flex items-center justify-center p-6 md:p-20">
          <div className="max-w-4xl text-center">
            <TextReveal theme="light" className="text-calf-dark leading-[1.1]">
              Calf is crafted for everyday coffee lovers. Using selected beans and fresh milk, we deliver smooth and balanced flavor in every can.
            </TextReveal>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="min-h-screen p-6 md:p-20 bg-calf-white">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full md:h-[80vh]">
                <div className="md:col-span-2 bg-calf-mocha/10 rounded-3xl p-8 flex items-end relative overflow-hidden group">
                    <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
                    <img 
                      src="/img/arabica1.jpg" 
                      alt="Premium Arabica Coffee"
                      className="absolute inset-0 w-full h-full object-cover"
                    /> {/* Placeholder Image */}
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-calf-white">Premium Arabica</h3>
                        <p className="text-calf-white/60">Sourced from the best highlands.</p>
                    </div>
                </div>
                <div className="bg-calf-blue/20 rounded-3xl p-8 flex items-end relative overflow-hidden">
                     <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-calf-dark">Fresh Milk</h3>
                        <p className="text-calf-dark/60">Delivered daily.</p>
                    </div>
                </div>
                <div className="bg-neutral-100 rounded-3xl p-8 flex items-end relative overflow-hidden">
                     <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-calf-dark">Zero Preservatives</h3>
                    </div>
                </div>
                <div className="md:col-span-2 bg-calf-dark rounded-3xl p-8 flex items-end relative overflow-hidden text-calf-white">
                     <div className="relative z-10">
                        <h3 className="text-3xl font-bold">Crafted for You</h3>
                        <p className="opacity-80">Experience the difference.</p>
                    </div>
                </div>
             </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-calf-white border-y border-neutral-100">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div>
                    <h2 className="text-6xl md:text-8xl font-bold text-calf-mocha">50K+</h2>
                    <p className="text-xl text-neutral-500 mt-2">Happy Customers</p>
                </div>
                <div>
                    <h2 className="text-6xl md:text-8xl font-bold text-calf-mocha">120+</h2>
                    <p className="text-xl text-neutral-500 mt-2">Stores Nationwide</p>
                </div>
                <div>
                    <h2 className="text-6xl md:text-8xl font-bold text-calf-mocha">5+</h2>
                    <p className="text-xl text-neutral-500 mt-2">Years Experience</p>
                </div>
            </div>
        </section>

        <Footer />

      </div>
    </main>
  );
}
