/** Course-relative lesson links, public file paths, and externally hosted materials. */
export function materialUrl(courseId: string, href: string): string {
  if (href.startsWith('https://')) return href;
  const base = import.meta.env.BASE_URL;
  return href.startsWith('/')
    ? `${base}${href.slice(1)}`
    : `${base}courses/${courseId}/${href}`;
}
