import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { X, ExternalLink } from "lucide-react";
import eksekutif from "@/data/divisions/eksekutif.json";
import ibadah from "@/data/divisions/ibadah.json";
import keamanan from "@/data/divisions/keamanan.json";
import kebersihan from "@/data/divisions/kebersihan.json";
import bahasa from "@/data/divisions/bahasa.json";
import olahraga from "@/data/divisions/olahraga.json";
import perpustakaan from "@/data/divisions/perpustakaan.json";
import publikasi from "@/data/divisions/publikasi.json";
import humas from "@/data/divisions/humas.json";

interface Member {
  id: number;
  divisionId: number;
  role: string;
  name: string;
  profileUrl: string;
}

interface DivisionWithMembers {
  id: number;
  name: string;
  icon: string;
  color: string;
  vision: string;
  mission: string;
  members: Member[];
}

// Helper to render dynamic icon from string
const DynamicIcon = ({ name, color, className }: { name: string, color: string, className?: string }) => {
  // Use name as-is from Lucide exports
  const IconComponent = (Icons as any)[name] || Icons.CircleDot;
  return <IconComponent color={color} className={className} strokeWidth={1.5} />;
};

export function Divisi() {
  const [selectedDiv, setSelectedDiv] = useState<DivisionWithMembers | null>(null);
  const displayData: DivisionWithMembers[] = [
    eksekutif,
    ibadah,
    keamanan,
    kebersihan,
    bahasa,
    olahraga,
    perpustakaan,
    publikasi,
    humas,
  ] as DivisionWithMembers[];

  return (
    <>
      <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Divisi OSBA</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Pilar-pelaksana berbagai program kerja unggulan untuk mewujudkan visi pesantren.</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {displayData.map((item, idx) => (
            <DivisionCard key={item.id} divisi={item} index={idx} onClick={() => setSelectedDiv(item)} />
          ))}
        </div>
      </div>
      </section>

      {/* Complex Modal for Division Detail */}
      <AnimatePresence>
        {selectedDiv && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedDiv(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10 flex flex-col"
            >
              {/* Modal Header */}
              <div 
                className="p-8 relative overflow-hidden" 
                style={{ backgroundColor: `${selectedDiv.color}15` }}
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDiv(null);
                  }}
                  className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all z-50 cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-600 hover:text-slate-900" />
                </button>
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <DynamicIcon name={selectedDiv.icon} color={selectedDiv.color} className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#0F172A]">Divisi {selectedDiv.name}</h3>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-8 flex-1">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-[#0F172A] mb-2 flex items-center gap-2">
                      <Icons.Eye className="w-5 h-5" color={selectedDiv.color} /> Visi
                    </h4>
                    <p className="text-slate-600 leading-relaxed">{selectedDiv.vision}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-[#0F172A] mb-2 flex items-center gap-2">
                      <Icons.Rocket className="w-5 h-5" color={selectedDiv.color} /> Misi
                    </h4>
                    <p className="text-slate-600 leading-relaxed">{selectedDiv.mission}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-xl text-[#0F172A] mb-6 border-b pb-4">Struktur Anggota</h4>
                  {selectedDiv.members && selectedDiv.members.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedDiv.members.map((member) => (
                        <a 
                          key={member.id} 
                          href={member.profileUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 hover:border-[#0F172A] hover:shadow-md transition-all group"
                        >
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{member.role}</p>
                            <p className="font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">{member.name}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <Icons.Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">Struktur anggota belum diperbarui</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// Subcomponent for the interactive card
function DivisionCard({ divisi, index, onClick }: { divisi: DivisionWithMembers, index: number, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 cursor-pointer hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 overflow-hidden flex flex-col items-center justify-center min-h-[220px]"
    >
      {/* Dynamic background glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ backgroundColor: divisi.color }}
      ></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-slate-100 rounded-full scale-150 group-hover:scale-0 transition-transform duration-500"></div>
          <DynamicIcon 
            name={divisi.icon} 
            color={isHovered ? divisi.color : "#0F172A"} 
            className="w-12 h-12 relative z-10 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110" 
          />
        </div>
        <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-slate-700 transition-colors">
          {divisi.name}
        </h3>
      </div>
    </motion.div>
  );
}
