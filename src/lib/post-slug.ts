interface SlugCandidate {
  id: string;
  slug?: string;
}

export function getPostSlug(postOrSlug: SlugCandidate | string): string {
  if (typeof postOrSlug === 'string') {
    return postOrSlug;
  }

  const lastSegment = postOrSlug.id.split('/').pop();

  return postOrSlug.slug ?? lastSegment?.replace(/\.[^.]+$/, '') ?? 'default-slug';
}
