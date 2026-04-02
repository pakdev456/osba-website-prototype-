import { db } from "./db";
import {
  divisions,
  members,
  events,
  galleryImages,
  driveLinks,
  type DivisionWithMembers,
  type Event,
  type GalleryImage,
  type DriveLink,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getDivisions(): Promise<DivisionWithMembers[]>;
  getEvents(): Promise<Event[]>;
  getGallery(): Promise<GalleryImage[]>;
  getDriveLinks(): Promise<DriveLink[]>;
}

export class DatabaseStorage implements IStorage {
  async getDivisions(): Promise<DivisionWithMembers[]> {
    if (!db) return new MockStorage().getDivisions();
    try {
      const allDivisions = await db.select().from(divisions);
      const allMembers = await db.select().from(members);
      
      return allDivisions.map(div => ({
        ...div,
        members: allMembers.filter(m => m.divisionId === div.id)
      }));
    } catch {
      return new MockStorage().getDivisions();
    }
  }

  async getEvents(): Promise<Event[]> {
    if (!db) return new MockStorage().getEvents();
    try {
      return await db.select().from(events);
    } catch {
      return new MockStorage().getEvents();
    }
  }

  async getGallery(): Promise<GalleryImage[]> {
    if (!db) return new MockStorage().getGallery();
    try {
      return await db.select().from(galleryImages);
    } catch {
      return new MockStorage().getGallery();
    }
  }

  async getDriveLinks(): Promise<DriveLink[]> {
    if (!db) return new MockStorage().getDriveLinks();
    try {
      return await db.select().from(driveLinks);
    } catch {
      return new MockStorage().getDriveLinks();
    }
  }
}

export class MockStorage implements IStorage {
  async getDivisions(): Promise<DivisionWithMembers[]> {
    return [
      { id: 1, name: "Eksekutif", icon: "Crown", color: "#D97706", vision: "Menjadi teladan bagi santri lain.", mission: "Memimpin dengan adil dan bijaksana.", members: [{id: 1, divisionId: 1, role: "Ketua", name: "Ahmad Fulan", profileUrl: "https://example.com/profile/ahmad"}, {id: 2, divisionId: 1, role: "Wakil", name: "Budi Santoso", profileUrl: "https://example.com/profile/budi"}, {id: 3, divisionId: 1, role: "Sekretaris 1", name: "Cahyo Rahman", profileUrl: "https://example.com/profile/cahyo"}, {id: 4, divisionId: 1, role: "Sekretaris 2", name: "Dani Pratama", profileUrl: "https://example.com/profile/dani"}, {id: 5, divisionId: 1, role: "Bendahara 1", name: "Eko Suryanto", profileUrl: "https://example.com/profile/eko"}, {id: 6, divisionId: 1, role: "Bendahara 2", name: "Fajar Rizki", profileUrl: "https://example.com/profile/fajar"}, {id: 7, divisionId: 1, role: "Anggota", name: "Gilang Maulana", profileUrl: "https://example.com/profile/gilang"}, {id: 8, divisionId: 1, role: "Anggota", name: "Hadi Wijaya", profileUrl: "https://example.com/profile/hadi"}] },
      { id: 2, name: "Ibadah", icon: "BookHeart", color: "#059669", vision: "Meningkatkan kualitas ibadah santri.", mission: "Mengadakan program sholat berjamaah dan kajian rutin.", members: [{id: 9, divisionId: 2, role: "Ketua", name: "Iman Setiawan", profileUrl: "https://example.com/profile/iman"}, {id: 10, divisionId: 2, role: "Wakil", name: "Jaka Permana", profileUrl: "https://example.com/profile/jaka"}, {id: 11, divisionId: 2, role: "Anggota", name: "Karim Halim", profileUrl: "https://example.com/profile/karim"}, {id: 12, divisionId: 2, role: "Anggota", name: "Luthfi Rahman", profileUrl: "https://example.com/profile/luthfi"}, {id: 13, divisionId: 2, role: "Anggota", name: "Miftah Hidayat", profileUrl: "https://example.com/profile/miftah"}, {id: 14, divisionId: 2, role: "Anggota", name: "Noval Saputra", profileUrl: "https://example.com/profile/noval"}, {id: 15, divisionId: 2, role: "Anggota", name: "Oka Pratama", profileUrl: "https://example.com/profile/oka"}, {id: 16, divisionId: 2, role: "Anggota", name: "Prayogi Santoso", profileUrl: "https://example.com/profile/prayogi"}] },
      { id: 3, name: "Keamanan", icon: "Shield", color: "#DC2626", vision: "Terciptanya lingkungan yang aman dan nyaman.", mission: "Menjaga ketertiban dan kedisiplinan santri.", members: [{id: 17, divisionId: 3, role: "Ketua", name: "Quincy Saputra", profileUrl: "https://example.com/profile/quincy"}, {id: 18, divisionId: 3, role: "Wakil", name: "Rinto Harahap", profileUrl: "https://example.com/profile/rinto"}, {id: 19, divisionId: 3, role: "Anggota", name: "Sigit Wibowo", profileUrl: "https://example.com/profile/sigit"}, {id: 20, divisionId: 3, role: "Anggota", name: "Taufik Hidayat", profileUrl: "https://example.com/profile/taufik"}, {id: 21, divisionId: 3, role: "Anggota", name: "Udin Saputra", profileUrl: "https://example.com/profile/udin"}, {id: 22, divisionId: 3, role: "Anggota", name: "Vito Aditya", profileUrl: "https://example.com/profile/vito"}, {id: 23, divisionId: 3, role: "Anggota", name: "Wahyu Kurniawan", profileUrl: "https://example.com/profile/wahyu"}, {id: 24, divisionId: 3, role: "Anggota", name: "Xander Wijaya", profileUrl: "https://example.com/profile/xander"}] },
      { id: 4, name: "Kebersihan", icon: "Sparkles", color: "#0D9488", vision: "Pesantren bersih, santri sehat.", mission: "Melaksanakan piket dan program kebersihan lingkungan.", members: [{id: 25, divisionId: 4, role: "Ketua", name: "Yayan Mulyana", profileUrl: "https://example.com/profile/yayan"}, {id: 26, divisionId: 4, role: "Wakil", name: "Zaki Rahman", profileUrl: "https://example.com/profile/zaki"}, {id: 27, divisionId: 4, role: "Anggota", name: "Ade Sutrisno", profileUrl: "https://example.com/profile/ade"}, {id: 28, divisionId: 4, role: "Anggota", name: "Bambang Irawan", profileUrl: "https://example.com/profile/bambang"}, {id: 29, divisionId: 4, role: "Anggota", name: "Citra Dewi", profileUrl: "https://example.com/profile/citra"}, {id: 30, divisionId: 4, role: "Anggota", name: "Dwi Putra", profileUrl: "https://example.com/profile/dwi"}, {id: 31, divisionId: 4, role: "Anggota", name: "Eka Putra", profileUrl: "https://example.com/profile/eka"}, {id: 32, divisionId: 4, role: "Anggota", name: "Faisal Anwar", profileUrl: "https://example.com/profile/faisal"}] },
      { id: 5, name: "Bahasa", icon: "Languages", color: "#2563EB", vision: "Meningkatkan kemampuan bahasa asing santri.", mission: "Mewajibkan berbahasa Arab dan Inggris pada hari tertentu.", members: [{id: 33, divisionId: 5, role: "Ketua", name: "Gunawan Surya", profileUrl: "https://example.com/profile/gunawan"}, {id: 34, divisionId: 5, role: "Wakil", name: "Hendro Suryanto", profileUrl: "https://example.com/profile/hendro"}, {id: 35, divisionId: 5, role: "Anggota", name: "Ivan Gunawan", profileUrl: "https://example.com/profile/ivan"}, {id: 36, divisionId: 5, role: "Anggota", name: "Joko Santoso", profileUrl: "https://example.com/profile/joko"}, {id: 37, divisionId: 5, role: "Anggota", name: "Kharismanto", profileUrl: "https://example.com/profile/kharismanto"}, {id: 38, divisionId: 5, role: "Anggota", name: "Lukman Hakim", profileUrl: "https://example.com/profile/lukman"}, {id: 39, divisionId: 5, role: "Anggota", name: "Muhammad Ali", profileUrl: "https://example.com/profile/mualiamu"}, {id: 40, divisionId: 5, role: "Anggota", name: "Nizar Hasan", profileUrl: "https://example.com/profile/nizar"}] },
      { id: 6, name: "Olahraga", icon: "Dumbbell", color: "#EA580C", vision: "Membentuk jasmani yang kuat dan sehat.", mission: "Menyelenggarakan kegiatan olahraga rutin dan perlombaan.", members: [{id: 41, divisionId: 6, role: "Ketua", name: "Okky Sidharta", profileUrl: "https://example.com/profile/okky"}, {id: 42, divisionId: 6, role: "Wakil", name: "Parno Wisata", profileUrl: "https://example.com/profile/parno"}, {id: 43, divisionId: 6, role: "Anggota", name: "Quentin Tarantino", profileUrl: "https://example.com/profile/quentin"}, {id: 44, divisionId: 6, role: "Anggota", name: "Riky Febrian", profileUrl: "https://example.com/profile/riky"}, {id: 45, divisionId: 6, role: "Anggota", name: "Suryanto Malik", profileUrl: "https://example.com/profile/suryanto"}, {id: 46, divisionId: 6, role: "Anggota", name: "Toni Haryanto", profileUrl: "https://example.com/profile/toni"}, {id: 47, divisionId: 6, role: "Anggota", name: "Ubay Saputra", profileUrl: "https://example.com/profile/ubay"}, {id: 48, divisionId: 6, role: "Anggota", name: "Verry Hermanto", profileUrl: "https://example.com/profile/verry"}] },
      { id: 7, name: "Perpustakaan", icon: "Library", color: "#D97706", vision: "Meningkatkan minat baca santri.", mission: "Menambah koleksi buku dan membuat program literasi.", members: [{id: 49, divisionId: 7, role: "Ketua", name: "Wawan Setiawan", profileUrl: "https://example.com/profile/wawan"}, {id: 50, divisionId: 7, role: "Wakil", name: "Xavier Putra", profileUrl: "https://example.com/profile/xavier"}, {id: 51, divisionId: 7, role: "Anggota", name: "Yusuf Santoso", profileUrl: "https://example.com/profile/yusuf"}, {id: 52, divisionId: 7, role: "Anggota", name: "Zakaria Harahap", profileUrl: "https://example.com/profile/zakaria"}, {id: 53, divisionId: 7, role: "Anggota", name: "Alif Pratama", profileUrl: "https://example.com/profile/alif"}, {id: 54, divisionId: 7, role: "Anggota", name: "Bayu Wijaya", profileUrl: "https://example.com/profile/bayu"}, {id: 55, divisionId: 7, role: "Anggota", name: "Chandra Kusuma", profileUrl: "https://example.com/profile/chandra"}, {id: 56, divisionId: 7, role: "Anggota", name: "Diono Raharjo", profileUrl: "https://example.com/profile/diono"}] },
      { id: 8, name: "Publikasi", icon: "Megaphone", color: "#7C3AED", vision: "Menyebarluaskan informasi dengan cepat dan akurat.", mission: "Mengelola mading dan media sosial OSBA.", members: [{id: 57, divisionId: 8, role: "Ketua", name: "Elihu Hermanto", profileUrl: "https://example.com/profile/elihu"}, {id: 58, divisionId: 8, role: "Wakil", name: "Fajar Simbolon", profileUrl: "https://example.com/profile/fajar"}, {id: 59, divisionId: 8, role: "Anggota", name: "Gery Hermanto", profileUrl: "https://example.com/profile/gery"}, {id: 60, divisionId: 8, role: "Anggota", name: "Hendra Santosha", profileUrl: "https://example.com/profile/hendra"}, {id: 61, divisionId: 8, role: "Anggota", name: "Indra Kusuma", profileUrl: "https://example.com/profile/indra"}, {id: 62, divisionId: 8, role: "Anggota", name: "Jaya Santoso", profileUrl: "https://example.com/profile/jaya"}, {id: 63, divisionId: 8, role: "Anggota", name: "Kemas Damar", profileUrl: "https://example.com/profile/kemas"}, {id: 64, divisionId: 8, role: "Anggota", name: "Leksi Ibrahim", profileUrl: "https://example.com/profile/leksi"}] },
      { id: 9, name: "Humas", icon: "Users", color: "#DB2777", vision: "Membangun hubungan baik di dalam dan luar pesantren.", mission: "Menjadi jembatan komunikasi antar lembaga.", members: [{id: 65, divisionId: 9, role: "Ketua", name: "Maulana Ihsan", profileUrl: "https://example.com/profile/maulana"}, {id: 66, divisionId: 9, role: "Wakil", name: "Nano Rasyid", profileUrl: "https://example.com/profile/nano"}, {id: 67, divisionId: 9, role: "Anggota", name: "Ongki Samyoto", profileUrl: "https://example.com/profile/ongki"}, {id: 68, divisionId: 9, role: "Anggota", name: "Prima Saputra", profileUrl: "https://example.com/profile/prima"}, {id: 69, divisionId: 9, role: "Anggota", name: "Quinton Hery", profileUrl: "https://example.com/profile/quinton"}, {id: 70, divisionId: 9, role: "Anggota", name: "Rahmad Heriyanto", profileUrl: "https://example.com/profile/rahmad"}, {id: 71, divisionId: 9, role: "Anggota", name: "Saiful Bahri", profileUrl: "https://example.com/profile/saiful"}, {id: 72, divisionId: 9, role: "Anggota", name: "Teguh Hermanto", profileUrl: "https://example.com/profile/teguh"}] }
    ];
  }

  async getEvents(): Promise<Event[]> {
    return [
      { id: 1, name: "Muhadhoroh Akbar", description: "Lomba pidato bahasa Arab dan Inggris tingkat pesantren yang menghadirkan perwakilan santri terbaik.", imageUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80", date: "15 Agustus 2026" },
      { id: 2, name: "Porseni (Pekan Olahraga dan Seni)", description: "Perlombaan antar asrama untuk mengasah bakat olahraga dan seni santri.", imageUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&q=80", date: "10 September 2026" },
      { id: 3, name: "Haflah Akhirussanah", description: "Perayaan kelulusan dan penyerahan penghargaan kepada santri berprestasi di akhir tahun ajaran.", imageUrl: "https://images.unsplash.com/photo-1579547621840-e2238421b44d?w=800&q=80", date: "20 Mei 2027" },
      { id: 4, name: "Festival Literasi", description: "Acara pameran buku, bedah buku, dan peluncuran karya tulis santri.", imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80", date: "15 November 2026" },
      { id: 5, name: "Pelatihan Kepemimpinan", description: "Program pelatihan intensif bagi pengurus OSBA dan ketua asrama untuk mengembangkan skill kepemimpinan.", imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", date: "1 Desember 2026" },
      { id: 6, name: "Istighosah dan Doa Bersama", description: "Kegiatan spiritual untuk meminta perlindungan dan berkah dari Allah.", imageUrl: "https://images.unsplash.com/photo-1532635241-44bdfe8a5c51?w=800&q=80", date: "27 Juni 2027" }
    ];
  }

  async getGallery(): Promise<GalleryImage[]> {
    return [
      { id: 1, url: "https://images.unsplash.com/photo-1577891729319-f4871c6ecdf1?w=800&q=80", caption: "Kegiatan Belajar" },
      { id: 2, url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&q=80", caption: "Upacara Bendera" },
      { id: 3, url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80", caption: "Diskusi Kelompok" },
      { id: 4, url: "https://images.unsplash.com/photo-1475721027785-f74dea9f2682?w=800&q=80", caption: "Lomba Pidato" },
      { id: 5, url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80", caption: "Porseni Olahraga" },
      { id: 6, url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80", caption: "Acara Kebersamaan" }
    ];
  }

  async getDriveLinks(): Promise<DriveLink[]> {
    return [
      { id: 1, title: "Dokumentasi Porseni 2025", url: "https://drive.google.com/drive/folders/dummy1" },
      { id: 2, title: "Materi Kajian Rutin", url: "https://drive.google.com/drive/folders/dummy2" },
      { id: 3, title: "SOP OSBA", url: "https://drive.google.com/drive/folders/dummy3" },
      { id: 4, title: "Arsip Muhadhoroh Akbar", url: "https://drive.google.com/drive/folders/dummy4" },
      { id: 5, title: "Dokumentasi Haflah Akhirussanah", url: "https://drive.google.com/drive/folders/dummy5" }
    ];
  }
}

export const storage = new DatabaseStorage();
