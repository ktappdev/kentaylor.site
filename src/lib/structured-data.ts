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
import { tagToSlug } from "./tags";

export type JsonLd = Record<string, unknown>;

const PERSON_ID = `${SITE.url}#person`;
const WEBSITE_ID = `${SITE.url}#website`;

export function buildHomePageSchemas(projects?: Project[]): JsonLd[] {
  return [
    buildPersonSchema(),
    buildWebSiteSchema(),
    buildLocalBusinessSchema(),
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

interface ProfilePageOptions {
  path: string;
  name: string;
  description: string;
}

// Takes the page identity as arguments. It used to hardcode /about/, so the CV
// page emitted a ProfilePage node whose url pointed at /about/ and whose name
// read "About Ken Taylor". Two pages claiming the same entity makes the pair
// look like a duplicate, so the CV page has to describe itself.
export function buildProfilePageSchemas(
  posts: BlogPost[],
  options: ProfilePageOptions = {
    path: SITE.aboutPath,
    name: `About ${SITE.name}`,
    description: SITE.author.longBio,
  },
): JsonLd[] {
  const pageUrl = absoluteUrl(options.path);

  return [
    buildPersonSchema(),
    buildWebSiteSchema(),
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: options.name,
      description: options.description,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: {
        "@id": PERSON_ID,
        "@type": "Person",
        name: SITE.author.name,
        alternateName: SITE.author.alternateNames,
        identifier: "ktappdev",
        description: SITE.author.longBio,
        jobTitle: SITE.author.jobTitle,
        url: absoluteUrl(SITE.aboutPath),
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

// Tag pages are topical hubs, so they get the same ItemList treatment as the
// blog index. Without it the page is just a breadcrumb with no statement about
// what it lists.
export function buildTagCollectionSchema(
  tag: string,
  posts: BlogPost[],
): JsonLd {
  const pageUrl = absoluteUrl(`/blog/tag/${tagToSlug(tag)}/`);
  const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${displayTag} Articles | ${SITE.name}`,
    description: `Posts tagged ${tag} by ${SITE.author.name}, a software engineer in ${SITE.author.location}.`,
    isPartOf: { "@id": `${SITE.url}/blog/` },
    about: { "@id": PERSON_ID },
    inLanguage: SITE.language,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(getPostUrl(post)),
        name: post.data.title,
      })),
    },
  };
}

function buildPersonSchema(): JsonLd {
  const { author } = SITE;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: author.name,
    url: absoluteUrl(SITE.aboutPath),
    alternateName: author.alternateNames,
    identifier: "ktappdev",
    description: author.longBio,
    jobTitle: author.jobTitle,
    email: author.email,
    // A bare Place name carries no location signal. A PostalAddress plus
    // GeoCoordinates is what lets search engines tie the profile to a place
    // rather than guessing from the bio text.
    homeLocation: {
      "@type": "Place",
      name: author.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: author.locality,
        addressRegion: author.region,
        addressCountry: author.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: author.geo.latitude,
        longitude: author.geo.longitude,
      },
    },
    knowsAbout: author.knowsAbout,
    areaServed: author.areaServed.map((area) => ({
      "@type": "Place",
      name: area.name,
    })),
    sameAs: author.sameAs,
  };
}

// A second entity type on the homepage. Google reads ProfessionalService for
// local intent queries ("software engineer in Georgetown"), which the Person
// node alone does not answer.
function buildLocalBusinessSchema(): JsonLd {
  const { author } = SITE;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}#service`,
    name: `${author.name} | Software Engineer in Georgetown, Guyana`,
    description: author.longBio,
    url: SITE.url,
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    priceRange: "$$",
    image: absoluteUrl(SITE.defaultSocialImage),
    address: {
      "@type": "PostalAddress",
      addressLocality: author.locality,
      addressRegion: author.region,
      addressCountry: author.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: author.geo.latitude,
      longitude: author.geo.longitude,
    },
    areaServed: [
      { "@type": "Country", name: author.country },
      { "@type": "AdministrativeArea", name: "Caribbean" },
    ],
    knowsAbout: author.knowsAbout,
    sameAs: author.sameAs,
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
