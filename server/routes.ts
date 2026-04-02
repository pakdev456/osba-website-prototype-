import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { db } from "./db";
import { divisions, members, events, galleryImages, driveLinks } from "@shared/schema";

async function seedDatabase() {
  if (!db) {
    console.log("Database not available, using mock data");
    return;
  }

  try {
    const existingDivisions = await storage.getDivisions();
    if (existingDivisions.length === 0) {
      console.log("Seeding database...");
      
      // 1. Divisions
      const divisionData = [
        { name: "Eksekutif", icon: "Crown", color: "#D97706", vision: "Menjadi teladan bagi santri lain.", mission: "Memimpin dengan adil dan bijaksana." },
        { name: "Ibadah", icon: "BookHeart", color: "#059669", vision: "Meningkatkan kualitas ibadah santri.", mission: "Mengadakan program sholat berjamaah dan kajian rutin." },
        { name: "Keamanan", icon: "Shield", color: "#DC2626", vision: "Terciptanya lingkungan yang aman dan nyaman.", mission: "Menjaga ketertiban dan kedisiplinan santri." },
        { name: "Kebersihan", icon: "Sparkles", color: "#0D9488", vision: "Pesantren bersih, santri sehat.", mission: "Melaksanakan piket dan program kebersihan lingkungan." },
        { name: "Bahasa", icon: "Languages", color: "#2563EB", vision: "Meningkatkan kemampuan bahasa asing santri.", mission: "Mewajibkan berbahasa Arab dan Inggris pada hari tertentu." },
        { name: "Olahraga", icon: "Dumbbell", color: "#EA580C", vision: "Membentuk jasmani yang kuat dan sehat.", mission: "Menyelenggarakan kegiatan olahraga rutin dan perlombaan." },
        { name: "Perpustakaan", icon: "Library", color: "#D97706", vision: "Meningkatkan minat baca santri.", mission: "Menambah koleksi buku dan membuat program literasi." },
        { name: "Publikasi", icon: "Megaphone", color: "#7C3AED", vision: "Menyebarluaskan informasi dengan cepat dan akurat.", mission: "Mengelola mading dan media sosial OSBA." },
        { name: "Humas", icon: "Users", color: "#DB2777", vision: "Membangun hubungan baik di dalam dan luar pesantren.", mission: "Menjadi jembatan komunikasi antar lembaga." }
      ];

      const insertedDivisions = await db.insert(divisions).values(divisionData).returning();

      // 2. Members (For the first division - Eksekutif, as an example)
      const eksekutifId = insertedDivisions[0].id;
      const memberData = [
        { divisionId: eksekutifId, role: "Ketua", name: "Ahmad Fulan", profileUrl: "https://example.com/ahmad" },
        { divisionId: eksekutifId, role: "Wakil", name: "Budi Santoso", profileUrl: "https://example.com/budi" },
        { divisionId: eksekutifId, role: "Anggota", name: "Cahyo", profileUrl: "https://example.com/cahyo" },
        { divisionId: eksekutifId, role: "Anggota", name: "Dani", profileUrl: "https://example.com/dani" },
        { divisionId: eksekutifId, role: "Anggota", name: "Eko", profileUrl: "https://example.com/eko" },
        { divisionId: eksekutifId, role: "Anggota", name: "Fajar", profileUrl: "https://example.com/fajar" },
        { divisionId: eksekutifId, role: "Anggota", name: "Gilang", profileUrl: "https://example.com/gilang" },
        { divisionId: eksekutifId, role: "Anggota", name: "Hadi", profileUrl: "https://example.com/hadi" },
      ];
      await db.insert(members).values(memberData);

      // 3. Events
      const eventData = [
        { name: "Muhadhoroh Akbar", description: "Lomba pidato bahasa Arab dan Inggris tingkat pesantren yang menghadirkan perwakilan santri terbaik. Kompetisi ini bertujuan untuk meningkatkan kemampuan berbicara dan kepercayaan diri santri dalam berbagai bahasa.", imageUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80", date: "15 Agustus 2026" },
        { name: "Porseni (Pekan Olahraga dan Seni)", description: "Perlombaan antar asrama untuk mengasah bakat olahraga dan seni santri. Terdapat puluhan cabang lomba mulai dari olahraga, musik, tari, hingga kesenian tradisional. Ajang ini menjadi momentum terpenting dalam kalender tahunan pesantren.", imageUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&q=80", date: "10 September 2026" },
        { name: "Haflah Akhirussanah", description: "Perayaan kelulusan dan penyerahan penghargaan kepada santri berprestasi di akhir tahun ajaran. Acara ini dihadiri oleh keluarga santri, guru, dan pimpinan pesantren untuk merayakan pencapaian luar biasa.", imageUrl: "https://images.unsplash.com/photo-1579547621840-e2238421b44d?w=800&q=80", date: "20 Mei 2027" },
        { name: "Festival Literasi", description: "Acara pameran buku, bedah buku, dan peluncuran karya tulis santri. Festival ini dirancang untuk meningkatkan minat baca dan tulis di lingkungan pesantren serta memberikan platform bagi santri untuk mempublikasikan karya mereka.", imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80", date: "15 November 2026" },
        { name: "Pelatihan Kepemimpinan", description: "Program pelatihan intensif bagi pengurus OSBA dan ketua asrama untuk mengembangkan skill kepemimpinan, manajemen, dan komunikasi efektif. Pelatihan dilakukan oleh narasumber profesional dari luar pesantren.", imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", date: "1 Desember 2026" },
        { name: "Istighosah dan Doa Bersama", description: "Kegiatan spiritual untuk meminta perlindungan dan berkah dari Allah. Seluruh santri dan civitas akademika pesantren berkumpul untuk melakukan istighosah dan doa bersama sebagai bentuk bakti dan rasa syukur.", imageUrl: "https://images.unsplash.com/photo-1532635241-44bdfe8a5c51?w=800&q=80", date: "27 Juni 2027" }
      ];
      await db.insert(events).values(eventData);

      // 4. Gallery Images
      const galleryData = [
        { url: "https://images.unsplash.com/photo-1577891729319-f4871c6ecdf1?w=800&q=80", caption: "Kegiatan Belajar" },
        { url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&q=80", caption: "Upacara Bendera" },
        { url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80", caption: "Diskusi Kelompok" },
        { url: "https://images.unsplash.com/photo-1475721027785-f74dea9f2682?w=800&q=80", caption: "Lomba Pidato" },
        { url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80", caption: "Porseni Olahraga" },
        { url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80", caption: "Acara Kebersamaan" }
      ];
      await db.insert(galleryImages).values(galleryData);

      // 5. Drive Links
      const driveLinkData = [
        { title: "Dokumentasi Porseni 2025", url: "https://drive.google.com/drive/folders/dummy1" },
        { title: "Materi Kajian Rutin", url: "https://drive.google.com/drive/folders/dummy2" },
        { title: "SOP OSBA", url: "https://drive.google.com/drive/folders/dummy3" },
        { title: "Arsip Muhadhoroh Akbar", url: "https://drive.google.com/drive/folders/dummy4" },
        { title: "Dokumentasi Haflah Akhirussanah", url: "https://drive.google.com/drive/folders/dummy5" }
      ];
      await db.insert(driveLinks).values(driveLinkData);

      console.log("Database seeded successfully!");
    }
  } catch (error) {
    console.warn("Failed to seed database, using mock data:", error);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Try to seed database
  seedDatabase().catch(err => console.error("Failed to seed database:", err));

  app.get(api.divisions.list.path, async (_req, res) => {
    const divisionsList = await storage.getDivisions();
    res.json(divisionsList);
  });

  app.get(api.events.list.path, async (_req, res) => {
    const eventsList = await storage.getEvents();
    res.json(eventsList);
  });

  app.get(api.gallery.list.path, async (_req, res) => {
    const galleryList = await storage.getGallery();
    res.json(galleryList);
  });

  app.get(api.driveLinks.list.path, async (_req, res) => {
    const linksList = await storage.getDriveLinks();
    res.json(linksList);
  });

  return httpServer;
}
