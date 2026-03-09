import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

// Helper for Zod parsing with logging
function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    // Return original data as fallback to avoid crashing the UI if backend schema is slightly off
    return data as T;
  }
  return result.data;
}

export function useDivisions() {
  return useQuery({
    queryKey: [api.divisions.list.path],
    queryFn: async () => {
      const res = await fetch(api.divisions.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch divisions");
      const data = await res.json();
      return parseWithLogging(api.divisions.list.responses[200], data, "divisions.list");
    },
  });
}

export function useEvents() {
  return useQuery({
    queryKey: [api.events.list.path],
    queryFn: async () => {
      const res = await fetch(api.events.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      return parseWithLogging(api.events.list.responses[200], data, "events.list");
    },
  });
}

export function useGallery() {
  return useQuery({
    queryKey: [api.gallery.list.path],
    queryFn: async () => {
      const res = await fetch(api.gallery.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch gallery");
      const data = await res.json();
      return parseWithLogging(api.gallery.list.responses[200], data, "gallery.list");
    },
  });
}

export function useDriveLinks() {
  return useQuery({
    queryKey: [api.driveLinks.list.path],
    queryFn: async () => {
      const res = await fetch(api.driveLinks.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch drive links");
      const data = await res.json();
      return parseWithLogging(api.driveLinks.list.responses[200], data, "driveLinks.list");
    },
  });
}
