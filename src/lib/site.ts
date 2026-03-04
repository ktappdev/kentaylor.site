export const SITE = {
  url: "https://kentaylor.dev",
  name: "Ken Taylor",
  defaultTitle: "Ken Taylor | Guyanese Developer • Music Producer • Entrepreneur",
  defaultDescription:
    "Co-founder of Lugetech & creator of ReviewIt.gy. Self-taught Guyanese software engineer, music producer, and entrepreneur from Georgetown, Guyana building tech and creative solutions for the Caribbean.",
  defaultSocialImage: "/og-image.jpg",
  locale: "en_GY",
  language: "en-US",
  themeColor: "#0a0a0a",
  rssPath: "/rss.xml",
  aboutPath: "/about/",
  author: {
    name: "Ken Taylor",
    location: "Georgetown, Guyana",
    email: "kentaylorappdev@gmail.com",
    shortBio:
      "Self-taught software engineer, music producer, and entrepreneur from Georgetown, Guyana.",
    longBio:
      "Self-taught Guyanese software engineer, music producer, and entrepreneur from Georgetown, Guyana building tech and creative solutions for the Caribbean.",
    jobTitle: "Software Engineer, Music Producer, Entrepreneur",
    socialHandle: "@ktappdev",
    sameAs: [
      "https://github.com/ktappdev",
      "https://x.com/ktappdev",
      "https://gy.linkedin.com/in/ken-taylor-16006280",
      "https://www.youtube.com/@KendaBeatMaker",
    ],
  },
} as const;

export function absoluteUrl(path: string | URL): string {
  if (path instanceof URL) {
    return path.toString();
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return new URL(path, SITE.url).toString();
}
