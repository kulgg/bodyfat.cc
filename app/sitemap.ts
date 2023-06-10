import { i18n } from "@/i18n-config";

export default async function sitemap() {
  const paths = ["", "me"];
  const routes = i18n.locales.flatMap((x) =>
    paths.map((y) => {
      if (y === "")
        return {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${x}`,
          lastModified: new Date().toISOString().split("T")[0],
        };
      else
        return {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${x}/${y}`,
          lastModified: new Date().toISOString().split("T")[0],
        };
    })
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date().toISOString().split("T")[0],
    },
    ...routes,
  ];
}
