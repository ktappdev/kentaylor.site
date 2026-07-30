export const SITE = {
  url: "https://kentaylor.dev",
  name: "Ken Taylor",
  defaultTitle: "Ken Taylor | Guyanese Software Engineer & Entrepreneur",
  defaultDescription:
    "Co-founder of Lugetech & creator of ReviewIt.gy. Self-taught Guyanese software engineer and entrepreneur from Georgetown, Guyana building tech solutions for the Caribbean.",
  defaultSocialImage: "/og-image.jpg",
  locale: "en_GY",
  language: "en-US",
  themeColor: "#0a0a0a",
  rssPath: "/rss.xml",
  aboutPath: "/about/",
  author: {
    name: "Ken Taylor",
    alternateNames: ["ktappdev"],
    location: "Georgetown, Guyana",
    email: "kentaylorappdev@gmail.com",
    shortBio:
      "Self-taught software engineer and entrepreneur from Georgetown, Guyana.",
    longBio:
      "Self-taught Guyanese software engineer and entrepreneur from Georgetown, Guyana building tech solutions for the Caribbean.",
    jobTitle: "Software Engineer, Entrepreneur",
    socialHandle: "@ktappdev",
    sameAs: [
      "https://github.com/ktappdev",
      "https://x.com/ktappdev",
      "https://gy.linkedin.com/in/ken-taylor-16006280",
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
