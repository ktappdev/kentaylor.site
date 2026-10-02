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
    locality: "Georgetown",
    region: "Demerara-Mahaica",
    country: "Guyana",
    countryCode: "GY",
    geo: { latitude: 6.8013, longitude: -58.1551 },
    email: "kentaylorappdev@gmail.com",
    shortBio:
      "Self-taught software engineer and entrepreneur from Georgetown, Guyana.",
    longBio:
      "Self-taught Guyanese software engineer and entrepreneur from Georgetown, Guyana building tech solutions for the Caribbean.",
    jobTitle: "Software Engineer, Entrepreneur",
    socialHandle: "@ktappdev",
    knowsAbout: [
      "Software Engineering",
      "Go",
      "Rust",
      "TypeScript",
      "Artificial Intelligence",
      "Large Language Models",
      "Self-Hosting",
      "Cloud Infrastructure",
      "Web Development",
    ],
    areaServed: [
      { name: "Guyana", type: "Country" },
      { name: "Caribbean", type: "AdministrativeArea" },
    ],
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
