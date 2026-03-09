import { z } from 'zod';
import { 
  divisions, members, events, galleryImages, driveLinks 
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// Define custom schema for Division with Members
const memberSchema = z.custom<typeof members.$inferSelect>();
const divisionWithMembersSchema = z.custom<typeof divisions.$inferSelect & { members: typeof members.$inferSelect[] }>();

export const api = {
  divisions: {
    list: {
      method: 'GET' as const,
      path: '/api/divisions' as const,
      responses: {
        200: z.array(divisionWithMembersSchema),
      },
    },
  },
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events' as const,
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
      },
    },
  },
  gallery: {
    list: {
      method: 'GET' as const,
      path: '/api/gallery' as const,
      responses: {
        200: z.array(z.custom<typeof galleryImages.$inferSelect>()),
      },
    },
  },
  driveLinks: {
    list: {
      method: 'GET' as const,
      path: '/api/drive-links' as const,
      responses: {
        200: z.array(z.custom<typeof driveLinks.$inferSelect>()),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
