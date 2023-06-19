import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";
import Header from "./Header";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const clash = localFont({
  src: "../ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // ToDo: use translations here once intl fully supports RSC
  if (locale === "de") {
    return {
      title: {
        template: "%s | bodyfat.cc",
        default: `Körperfettanteil berechnen | bodyfat.cc`,
      },
      description:
        "Nutzen Sie unser Tool um einfach und präzise Ihren Körperfettanteil zu berechnen. Keine Registrierung nötig. 100 % privat. Alle Daten bleiben auf Ihrem Gerät.",
    };
  }

  return {
    title: {
      template: "%s | bodyfat.cc",
      default: `Army body fat calculator | bodyfat.cc`,
    },
    description:
      "Use our reliable army body fat calculator to determine your body fat percentage for free. No registration needed. 100% private . All data stays on your device.",
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={cn(
          "bg-slate-950 text-white dark font-default",
          clash.variable,
          inter.variable
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <div className="max-w-[800px] mx-auto">{children}</div>
          <Toaster />
        </NextIntlClientProvider>
      </body>
      <Script
        defer
        data-domain="bodyfat.cc"
        src="https://analytics.kul.gg/js/script.js"
      />
    </html>
  );
}
