import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEvents } from "@/hooks/use-api";
import { Calendar, X, MapPin, Clock } from "lucide-react";

export function EventSection() {
  const { data: events, isLoading } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // Mock data for visual completeness
  const mockEvents = [
    { id: 1, name: "Pekan Olahraga & Seni (PORSENI)", date: "15 Agustus 2026", description: "Ajang unjuk bakat santri dalam bidang olahraga dan seni. Memperebutkan piala bergilir antar asrama dengan puluhan cabang lomba.", imageUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&q=80" },
    { id: 2, name: "Muhadhoroh Akbar", date: "10 September 2026", description: "Pidato tiga bahasa (Arab, Inggris, Indonesia) yang ditampilkan oleh perwakilan santri terbaik di hadapan seluruh civitas akademika.", imageUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80" },
    { id: 3, name: "Festival Literasi", date: "22 Oktober 2026", description: "Pameran buku, bedah buku, dan peluncuran karya tulis santri. Bertujuan meningkatkan minat baca dan tulis di lingkungan pondok.", imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80" },
  ];

  const displayData = events && events.length > 0 ? events : mockEvents;

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Agenda Event</h2>
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
          <p className="text-slate-500 max-w-md text-lg">
            Program kerja unggulan yang akan dilaksanakan selama masa bakti 2026-2027.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-slate-200 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayData.map((event: any, idx: number) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 cursor-pointer group hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col"
              >
                <div className="h-56 relative overflow-hidden bg-gradient-to-br from-slate-200 to-slate-100">
                  {event.imageUrl ? (
                    <>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                      <img 
                        src={event.imageUrl} 
                        alt={event.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-400 font-medium text-sm">Gambar akan ditambahkan</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 shadow-sm text-sm font-bold text-[#0F172A]">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    {event.date}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {event.name}
                  </h3>
                  <p className="text-slate-500 line-clamp-2 mb-6 flex-1">
                    {event.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                    Lihat Detail <span className="ml-1">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Detailed Event */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-30 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="h-64 sm:h-80 relative bg-gradient-to-br from-slate-200 to-slate-100">
                {selectedEvent.imageUrl ? (
                  <>
                    <img 
                      src={selectedEvent.imageUrl} 
                      alt={selectedEvent.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">Gambar event akan ditambahkan</p>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4">{selectedEvent.name}</h3>
                  <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base font-medium text-blue-100">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" /> {selectedEvent.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" /> Area Pesantren
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5" /> 08:00 WIB - Selesai
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-12">
                <h4 className="text-xl font-bold text-[#0F172A] mb-4 border-b border-slate-100 pb-4">Deskripsi Kegiatan</h4>
                <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedEvent.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
