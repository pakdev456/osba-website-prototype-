import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 bg-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50/80 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto w-24 h-24 md:w-32 md:h-32 bg-[#0F172A] rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-900/20 rotate-3 hover:rotate-0 transition-transform duration-500"
        >
          <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] tracking-tight leading-tight mb-6 max-w-4xl mx-auto"
        >
          Organisasi Santri <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] to-blue-600">
            Babussalam
          </span>
        </motion.h1>
      </div>
    </section>
  );
}
