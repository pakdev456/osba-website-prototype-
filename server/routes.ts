import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { db } from "./db";
import { divisions, members, events, galleryImages, driveLinks } from "@shared/schema";

async function seedDatabase() {
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
      { name: "Muhadhoroh Akbar", description: "Lomba pidato bahasa Arab dan Inggris tingkat pesantren.", imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80", date: "15 Agustus 2026" },
      { name: "Porseni (Pekan Olahraga dan Seni)", description: "Perlombaan antar kamar untuk mengasah bakat olahraga dan seni santri.", imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80", date: "10 September 2026" },
      { name: "Haflah Akhirussanah", description: "Perayaan kelulusan dan penyerahan penghargaan kepada santri berprestasi.", imageUrl: "https://images.unsplash.com/photo-1523580458125-d72b25b6a71e?auto=format&fit=crop&q=80", date: "20 Mei 2027" }
    ];
    await db.insert(events).values(eventData);

    // 4. Gallery Images
    const galleryData = [
      { url: "https://images.unsplash.com/photo-1511649475669-e288648b2339?auto=format&fit=crop&q=80", caption: "Kegiatan Belajar" },
      { url: "https://images.unsplash.com/photo-1427504494785-319ce508ae64?auto=format&fit=crop&q=80", caption: "Upacara Bendera" },
      { url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80", caption: "Diskusi Kelompok" },
      { url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80", caption: "Lomba Pidato" },
    ];
    await db.insert(galleryImages).values(galleryData);

    // 5. Drive Links
    const driveLinkData = [
      { title: "Dokumentasi Porseni 2025", url: "https://drive.google.com/drive/folders/dummy1" },
      { title: "Materi Kajian Rutin", url: "https://drive.google.com/drive/folders/dummy2" },
      { title: "SOP OSBA", url: "https://drive.google.com/drive/folders/dummy3" },
    ];
    await db.insert(driveLinks).values(driveLinkData);

    console.log("Database seeded successfully!");
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
