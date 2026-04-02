import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, FolderOpen, ExternalLink, X, Image as ImageIcon } from "lucide-react";
import driveLinksData from "@/data/drive-links.json";

interface GalleryImage {
  id: number;
  url: string;
  caption: string;
}

interface DriveLink {
  id: number;
  title: string;
  url: string;
}

export function Galeri() {
  const [showDriveModal, setShowDriveModal] = useState(false);

  // Mock data
  const mockGallery: GalleryImage[] = [
    { id: 1, url: "", caption: "Kegiatan Belajar" },
    { id: 2, url: "", caption: "Upacara Pagi" },
    { id: 3, url: "", caption: "Diskusi Kelompok" },
    { id: 4, url: "", caption: "Olahraga" },
  ];

  const displayGallery: GalleryImage[] = mockGallery;
  const displayLinks: DriveLink[] = driveLinksData;

  return (
    <>
      <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-slate-50 -z-10 skew-y-2 origin-top-left"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Galeri Dokumentasi</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6 mb-8"></div>
          
          <button 
            onClick={() => setShowDriveModal(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#0F172A] text-white font-bold rounded-xl shadow-xl shadow-slate-900/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            <FolderOpen className="w-5 h-5" />
            Link Drive OSBA
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {displayGallery.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden group cursor-pointer bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center"
              >
                {item.url ? (
                  <img src={item.url} alt={item.caption} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <Camera className="w-16 h-16 text-red-600/60 group-hover:text-red-500 transition-colors duration-300" />
                )}
                
                {/* Caption overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-100 flex items-end p-6">
                  <p className="text-white font-bold">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Drive Links Modal */}
      <AnimatePresence>
        {showDriveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowDriveModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl relative z-10"
            >
              <div className="p-6 sm:p-8 bg-[#0F172A] text-white flex justify-between items-center">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <FolderOpen className="w-7 h-7 text-blue-400" /> 
                  Arsip Drive OSBA
                </h3>
                <button 
                  onClick={() => setShowDriveModal(false)}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 sm:p-8 bg-slate-50 min-h-[300px]">
                {displayLinks.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {displayLinks.map((link: DriveLink) => (
                      <a 
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between group hover:border-[#0F172A] hover:shadow-lg transition-all duration-300"
                      >
                        <span className="font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                          {link.title}
                        </span>
                        <div className="w-10 h-10 bg-slate-100 group-hover:bg-blue-50 rounded-full flex items-center justify-center transition-colors">
                          <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                    <ImageIcon className="w-12 h-12 mb-3 opacity-50" />
                    <p>Belum ada link drive yang ditambahkan.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
