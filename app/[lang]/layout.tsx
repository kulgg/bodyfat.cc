import { Toaster } from "@/components/ui/toaster";
import { getDictionary } from "@/get-dictionary";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Locale, i18n } from "../../i18n-config";
import "../globals.css";
import Header from "./Header";
import Script from "next/script";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const clash = localFont({
  src: "../ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  return {
    title: {
      template: "%s | bodyfat.io",
      default: `${dictionary.title} | bodyfat.io`,
    },
    description: dictionary.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang} className="scroll-smooth">
      <body
        className={cn(
          "bg-slate-950 text-white dark font-default",
          clash.variable,
          inter.variable
        )}
      >
        <Header dictionary={dictionary} />
        <div className="max-w-[800px] mx-auto">{children}</div>
        <Toaster />
      </body>
      <Script
        defer
        data-domain="bodyfat.io"
        src="https://analytics.kul.gg/js/script.js"
      />
    </html>
  );
}
