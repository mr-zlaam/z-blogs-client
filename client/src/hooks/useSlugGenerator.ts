export function useSlugGenerator(title: string) {
  const slug = title
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
  return slug;
}
