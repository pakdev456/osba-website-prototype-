import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";
import { Beranda } from "@/components/sections/beranda";
import { Profil } from "@/components/sections/profil";
import { Divisi } from "@/components/sections/divisi";
import { EventSection } from "@/components/sections/event";
import { Galeri } from "@/components/sections/galeri";
import { Kontak } from "@/components/sections/kontak";

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-body scroll-smooth">
      <Navbar />
      
      <main>
        <Hero />
        <div id="beranda"><Beranda /></div>
        <div id="profil"><Profil /></div>
        <div id="divisi"><Divisi /></div>
        <div id="event"><EventSection /></div>
        <div id="galeri"><Galeri /></div>
        <div id="kontak"><Kontak /></div>
      </main>
    </div>
  );
}
