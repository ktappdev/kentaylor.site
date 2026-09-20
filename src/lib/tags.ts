export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function getTagUrl(tag: string): string {
  return `/blog/tag/${tagToSlug(tag)}/`;
}
