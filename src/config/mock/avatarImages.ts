/**
 * Profile photos provided by the user (src/assets/pfp_pictures, copied to
 * /public/pfp). pfp5.png is reserved for the signed-in user's avatar.
 * Keyed by person name as it appears across the mock data.
 */
export const PERSON_IMAGES: Record<string, { src: string; alt: string }> = {
  "Priya Sharma": { src: "/pfp/pfp1.png", alt: "Priya Sharma" },
  "Daniel Kim": { src: "/pfp/pfp2.png", alt: "Daniel Kim" },
  "Sofia Reyes": { src: "/pfp/pfp3.png", alt: "Sofia Reyes" },
  "Marcus Webb": { src: "/pfp/pfp4.png", alt: "Marcus Webb" },
  "Jordan Blake": { src: "/pfp/pfp5.png", alt: "Jordan Blake" },
};

export function personImage(name: string): { src: string; alt: string } | undefined {
  return PERSON_IMAGES[name];
}
