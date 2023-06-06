import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const clash = localFont({
  src: "./ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

export const metadata = {
  title: "Calculate bodyfat percentage | bodyfat.io",
  description: "Yoyoyo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "bg-slate-950 text-white dark font-default",
          clash.variable,
          inter.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
