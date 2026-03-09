import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Target, Compass, Flag } from "lucide-react";

const profilData = [
  {
    id: "sejarah",
    title: "Sejarah",
    icon: <BookOpen className="w-6 h-6" />,
    content: "Organisasi Santri Babussalam (OSBA) dibentuk sebagai respon atas kebutuhan wadah aspirasi dan pengembangan diri para santri. Sejak awal berdirinya, OSBA telah mencetak generasi pemimpin yang tangguh, berakhlak mulia, dan siap mengabdi untuk masyarakat. Perjalanan panjang ini diwarnai dengan berbagai program inovatif yang terus beradaptasi dengan perkembangan zaman."
  },
  {
    id: "tujuan",
    title: "Tujuan",
    icon: <Target className="w-6 h-6" />,
    content: "Tujuan utama dibentuknya OSBA adalah untuk melatih jiwa kepemimpinan, menumbuhkan rasa tanggung jawab, serta meningkatkan kedisiplinan santri. OSBA juga bertujuan menjadi jembatan komunikasi yang efektif antara santri dan dewan asatidz dalam mewujudkan lingkungan pondok yang kondusif dan harmonis."
  },
  {
    id: "visi",
    title: "Visi 2026-2027",
    icon: <Compass className="w-6 h-6" />,
    content: "Mewujudkan Organisasi Santri Babussalam yang progresif, inovatif, dan berlandaskan nilai-nilai keislaman yang kuat, serta menjadi pelopor dalam menciptakan santri yang berprestasi di kancah nasional maupun internasional."
  },
  {
    id: "misi",
    title: "Misi 2026-2027",
    icon: <Flag className="w-6 h-6" />,
    content: "1. Mengoptimalkan program pembinaan karakter dan kepemimpinan.\n2. Menyelenggarakan kegiatan yang memacu kreativitas dan intelektualitas.\n3. Membangun sinergi yang erat dengan seluruh elemen pesantren.\n4. Menegakkan kedisiplinan dan sunnah pondok dengan pendekatan persuasif."
  }
];

export function Profil() {
  const [activeTab, setActiveTab] = useState(profilData[0].id);

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Profil OSBA</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Tabs Navigation */}
          <div className="lg:w-1/3 flex flex-col gap-3">
            {profilData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all duration-300 ${
                  activeTab === item.id 
                    ? "bg-[#0F172A] text-white shadow-xl shadow-slate-900/20 scale-105" 
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-[#0F172A]"
                }`}
              >
                <div className={`p-2 rounded-xl ${activeTab === item.id ? "bg-white/20" : "bg-slate-100"}`}>
                  {item.icon}
                </div>
                <span className="font-bold text-lg">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 min-h-[400px] flex items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <AnimatePresence mode="wait">
                {profilData.map((item) => item.id === activeTab && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 w-full"
                  >
                    <div className="inline-flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-2xl mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-[#0F172A] mb-6">{item.title}</h3>
                    <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                      {item.content.split('\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
