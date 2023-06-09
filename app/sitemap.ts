export default async function sitemap() {
  const routes = ["", "/me"].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
