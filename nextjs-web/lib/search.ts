export function fuzzyIncludes(text: string, query: string) {
  const a = text.toLowerCase();
  const b = query.toLowerCase();
  return b.split(/\s+/).every((k) => a.includes(k));
}
