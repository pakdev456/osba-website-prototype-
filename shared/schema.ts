import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const divisions = pgTable("divisions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  vision: text("vision").notNull(),
  mission: text("mission").notNull(),
});

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  divisionId: integer("division_id").notNull(),
  role: text("role").notNull(), // Ketua, Wakil, Anggota
  name: text("name").notNull(),
  profileUrl: text("profile_url").notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  date: text("date").notNull(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  caption: text("caption").notNull(),
});

export const driveLinks = pgTable("drive_links", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
});

// Relations
export const divisionRelations = relations(divisions, ({ many }) => ({
  members: many(members),
}));

export const memberRelations = relations(members, ({ one }) => ({
  division: one(divisions, {
    fields: [members.divisionId],
    references: [divisions.id],
  }),
}));

// Schemas
export const insertDivisionSchema = createInsertSchema(divisions).omit({ id: true });
export const insertMemberSchema = createInsertSchema(members).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({ id: true });
export const insertDriveLinkSchema = createInsertSchema(driveLinks).omit({ id: true });

// Types
export type Division = typeof divisions.$inferSelect;
export type InsertDivision = z.infer<typeof insertDivisionSchema>;

export type Member = typeof members.$inferSelect;
export type InsertMember = z.infer<typeof insertMemberSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;

export type DriveLink = typeof driveLinks.$inferSelect;
export type InsertDriveLink = z.infer<typeof insertDriveLinkSchema>;

export type DivisionWithMembers = Division & { members: Member[] };
