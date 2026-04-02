import { motion } from "framer-motion";
import { Mail, Instagram, Youtube, Globe, ArrowUpRight } from "lucide-react";

export function Kontak() {
  const contactLinks = [
    { name: "Email", value: "babussalamsc26", icon: <Mail className="w-8 h-8" />, href: "mailto:babussalamsc26@gmail.com" },
    { name: "Instagram Mahad", value: "babussalam as-sunnah", icon: <Instagram className="w-8 h-8" />, href: "https://www.instagram.com/babussalam_assunnah/" },
    { name: "Instagram OSBA", value:"babussalamsc", icon: <Instagram className="w-8 h-8" />, href: "https://www.instagram.com/babussalamsc/" },
    { name: "YouTube", value: "Babussalam As-sunnah", icon: <Youtube className="w-8 h-8" />, href: "https://www.youtube.com/c/BabussalamAsSunnah" },
    { name: "Website", value: "babussalam.sch.id", icon: <Globe className="w-8 h-8" />, href: "https://babussalam.sch.id/" },
  ];

  return (
    <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden rounded-t-[3rem] sm:rounded-t-[5rem] mt-[-2rem] z-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Terhubung Dengan Kami
          </motion.h2>
          <p className="text-blue-200 max-w-2xl mx-auto text-lg">
            Pantau terus kegiatan dan program kerja OSBA melalui kanal resmi kami.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {contactLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-5 p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl min-w-[280px] flex-1 max-w-[350px] group transition-all duration-300"
            >
              <div className="p-4 bg-white/10 text-white rounded-xl group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                {link.icon}
              </div>
              <div className="flex-1">
                <p className="text-blue-200 text-sm font-semibold tracking-wider uppercase">{link.name}</p>
                <p className="text-xl font-bold mt-1 group-hover:text-blue-400 transition-colors">{link.value}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>

      <div className="text-center mt-32 border-t border-white/10 pt-8 text-blue-200/50 font-medium">
        <p>&copy; 2026-2027 Organisasi Santri Babussalam. All rights reserved.</p>
      </div>
    </section>
  );
}
