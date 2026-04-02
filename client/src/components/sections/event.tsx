import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, MapPin, Clock, Camera } from "lucide-react";
import eventsData from "@/data/events.json";

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
}

export function EventSection() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const displayData: Event[] = eventsData;

  return (
    <>
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Agenda Event</h2>
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
          <p className="text-slate-500 max-w-md text-lg">
            Event OSBA yang akan dilaksanakan pada periode ini 
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayData.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 cursor-pointer group hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col"
              >
                <div className="h-56 relative overflow-hidden bg-slate-100 flex items-center justify-center group">
                  {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center">
                      <Camera className="w-20 h-20 text-red-600/60 group-hover:text-red-500 transition-colors duration-300" />
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
        </div>
      </section>

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
              
              <div className="h-64 sm:h-80 relative bg-slate-100 flex items-center justify-center">
                {selectedEvent.imageUrl ? (
                  <img src={selectedEvent.imageUrl} alt={selectedEvent.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center">
                    <Camera className="w-28 h-28 text-red-600/60" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4">{selectedEvent.name}</h3>
                  <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base font-medium text-blue-100">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" /> {selectedEvent.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" /> {selectedEvent.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5" /> {selectedEvent.time}
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
    </>
  );
}
