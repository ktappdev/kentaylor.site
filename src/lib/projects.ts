import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;

export async function getPublishedProjects(): Promise<Project[]> {
  const projects = await getCollection("projects");

  return projects.sort((left, right) => {
    // Featured projects first
    if (left.data.featured && !right.data.featured) return -1;
    if (!left.data.featured && right.data.featured) return 1;
    // Then by id (numeric comparison for correct ordering)
    const leftId = parseInt(left.data.id, 10);
    const rightId = parseInt(right.data.id, 10);
    return leftId - rightId;
  });
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter((project) => project.data.featured);
}
