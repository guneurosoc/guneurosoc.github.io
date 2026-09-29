// Slug → Open Graph image title. Used by src/pages/og/[slug].png.ts and Head.astro.
// Titles are the pages' own titles; nothing else goes on the image.
export const OG_PAGES: Record<string, string> = {
  default: 'GU NeuroSoc',
  home: 'GU NeuroSoc',
  about: 'About',
  join: 'Join',
  committee: 'Committee',
  contact: 'Contact',
  'code-of-conduct': 'Code of Conduct',
  complaints: 'Complaints',
  constitution: 'Constitution',
  privacy: 'Privacy',
  credits: 'Credits',
  '404': 'Page not found',
};

export const OG_SUBTITLE = 'Glasgow University Neuroscience Society';
