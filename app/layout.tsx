import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/navigation";
import { TechCardProvider } from "./context/tech-card-context";
import { INITIAL_TECH_CARDS } from "./data/tech-card";
import Link from "next/link";
import { Toaster } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tsumiki",
  description: "個人の学びを管理し積み上げていく自己研鑽アプリ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster />
        <header className="border-b bg-background">
          <div
            className="
              mx-auto flex max-w-6xl
              flex-col gap-4 px-4 py-4
              sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-1">
              <Link href="/" className="text-xl font-semibold tracking-tight">
                Tsumiki
              </Link>
              <p className="text-sm text-muted-foreground">
                学んだ技術をひとつずつ、積み上げる
              </p>
            </div>
            <Nav />
          </div>
        </header>
        <TechCardProvider initialCards={INITIAL_TECH_CARDS}>
          {children}
        </TechCardProvider>
      </body>
    </html>
  );
}
