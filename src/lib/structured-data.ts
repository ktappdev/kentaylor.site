import {
  getPostReadingTimeMinutes,
  getPostSeoDescription,
  getPostStructuredImageUrls,
  getPostUpdatedDate,
  getPostUrl,
  type BlogPost,
} from "./blog";
import type { Project } from "./projects";
import { absoluteUrl, SITE } from "./site";

export type JsonLd = Record<string, unknown>;

const PERSON_ID = `${SITE.url}#person`;
const WEBSITE_ID = `${SITE.url}#website`;

export function buildHomePageSchemas(projects?: Project[]): JsonLd[] {
  return [
    buildPersonSchema(),
    buildWebSiteSchema(),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE.url}#webpage`,
      url: SITE.url,
      name: SITE.defaultTitle,
      description: SITE.defaultDescription,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      inLanguage: SITE.language,
      ...(projects && projects.length > 0 && {
        mainEntity: {
          "@type": "ItemList",
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          numberOfItems: projects.length,
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: project.data.link || project.data.github || SITE.url,
            name: project.data.title,
            item: {
              "@type": project.data.category === "site" ? "WebSite" : "SoftwareApplication",
              name: project.data.title,
              description: project.data.description,
              url: project.data.link || project.data.github || SITE.url,
              ...(project.data.category !== "site" && { applicationCategory: "WebApplication" }),
              ...(project.data.image && {
                image: project.data.image.startsWith("http")
                  ? project.data.image
                  : absoluteUrl(project.data.image),
              }),
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            },
          })),
        },
      }),
    },
  ];
}

export function buildBlogIndexSchemas(posts: BlogPost[]): JsonLd[] {
  const pageUrl = absoluteUrl("/blog/");

  return [
    buildPersonSchema(),
    buildWebSiteSchema(),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Blog | Ken Taylor",
      description:
        "Articles and insights on tech, software, and entrepreneurship from Ken Taylor.",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(getPostUrl(post)),
          name: post.data.title,
        })),
      },
    },
  ];
}

export function buildProfilePageSchemas(posts: BlogPost[]): JsonLd[] {
  const pageUrl = absoluteUrl(SITE.aboutPath);

  return [
    buildPersonSchema(),
    buildWebSiteSchema(),
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: `About ${SITE.name}`,
      description: SITE.author.longBio,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: {
        "@id": PERSON_ID,
        "@type": "Person",
        name: SITE.author.name,
        alternateName: ["ktappdev"],
        identifier: "ktappdev",
        description: SITE.author.longBio,
        url: pageUrl,
        sameAs: SITE.author.sameAs,
      },
      hasPart: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.data.title,
        url: absoluteUrl(getPostUrl(post)),
        datePublished: post.data.date.toISOString(),
        author: { "@id": PERSON_ID },
      })),
    },
  ];
}

export function buildBlogPostingSchemas(post: BlogPost): JsonLd[] {
  const pageUrl = absoluteUrl(getPostUrl(post));

  return [
    buildPersonSchema(),
    buildWebSiteSchema(),
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${pageUrl}#article`,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      isPartOf: { "@id": WEBSITE_ID },
      headline: post.data.title,
      description: getPostSeoDescription(post),
      datePublished: post.data.date.toISOString(),
      dateModified: getPostUpdatedDate(post).toISOString(),
      author: {
        "@id": PERSON_ID,
        "@type": "Person",
        name: SITE.author.name,
        url: absoluteUrl(SITE.aboutPath),
        sameAs: SITE.author.sameAs,
      },
      image: getPostStructuredImageUrls(post).map((image) => absoluteUrl(image)),
      keywords: post.data.tags,
      articleSection: "Blog",
      inLanguage: SITE.language,
      timeRequired: `PT${getPostReadingTimeMinutes(post)}M`,
    },
  ];
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path?: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

function buildPersonSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.author.name,
    url: absoluteUrl(SITE.aboutPath),
    alternateName: ["ktappdev"],
    identifier: "ktappdev",
    description: SITE.author.longBio,
    jobTitle: SITE.author.jobTitle,
    email: SITE.author.email,
    homeLocation: {
      "@type": "Place",
      name: SITE.author.location,
    },
    sameAs: SITE.author.sameAs,
  };
}

function buildWebSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.defaultDescription,
    inLanguage: SITE.language,
    publisher: { "@id": PERSON_ID },
  };
}
