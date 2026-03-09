import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export function Beranda() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4">Pengenalan Singkat</h2>
          <p className="text-xl md:text-3xl text-slate-700 leading-relaxed text-balance mb-12 font-medium">
            OSBA hadir sebagai wadah kreativitas, kepemimpinan, dan pengembangan karakter bagi seluruh santri. Bersama membangun ekosistem madrasah yang disiplin, islami, dan berprestasi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('#profil')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-[#0F172A] text-white shadow-xl shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Jelajahi OSBA
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('#kontak')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-white text-[#0F172A] border-2 border-slate-200 hover:border-[#0F172A] hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Hubungi OSBA
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
