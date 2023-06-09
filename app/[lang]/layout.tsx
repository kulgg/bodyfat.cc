import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import Header from "../Header";
import { i18n } from "../../i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const clash = localFont({
  src: "../ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

export const metadata = {
  title: "Calculate bodyfat percentage | bodyfat.io",
  description: "Yoyoyo",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} className="scroll-smooth">
      <body
        className={cn(
          "bg-slate-950 text-white dark font-default",
          clash.variable,
          inter.variable
        )}
      >
        <Header />
        <div className="max-w-[800px] mx-auto">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
