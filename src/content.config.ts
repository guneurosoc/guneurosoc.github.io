import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const roles = [
  'President',
  'Vice-President',
  'Treasurer',
  'Secretary',
  'Academic Events Coordinator',
  'Welfare Officer',
] as const;

// src/content/committee.json: an array of { role, name, year, askMeAbout }, one per role.
// Entry ids are derived from the role (e.g. "vice-president"), so the JSON needs no id field.
const committee = defineCollection({
  loader: file('src/content/committee.json', {
    parser: (text) =>
      JSON.parse(text).map((e: { role: string }) => ({
        id: e.role.toLowerCase().replace(/\s+/g, '-'),
        ...e,
      })),
  }),
  schema: z.object({
    role: z.enum(roles),
    name: z.string(),
    year: z.string(),
    askMeAbout: z.string(),
  }),
});

// src/content/previous-committees.json: an array of past committees, newest first, e.g.
//   [{ "year": "2025/26", "members": [{ "role": "President", "name": "..." }] }]
// Entry ids are the year. Starts empty; add a year when a committee hands over.
const previousCommittees = defineCollection({
  loader: file('src/content/previous-committees.json', {
    parser: (text) => JSON.parse(text).map((e: { year: string }) => ({ id: e.year, ...e })),
  }),
  schema: z.object({
    year: z.string().regex(/^\d{4}\/\d{2}$/, 'Use the form "2025/26"'),
    members: z.array(z.object({ role: z.string(), name: z.string() })),
  }),
});

export const collections = { committee, previousCommittees };
