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
    const allDivisions = await db.select().from(divisions);
    const allMembers = await db.select().from(members);
    
    return allDivisions.map(div => ({
      ...div,
      members: allMembers.filter(m => m.divisionId === div.id)
    }));
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getGallery(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages);
  }

  async getDriveLinks(): Promise<DriveLink[]> {
    return await db.select().from(driveLinks);
  }
}

export const storage = new DatabaseStorage();
