import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // use your bee-themed Navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Colmeias Hub",
  description: "Espaço para criatividade e colaboração",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {/* Replace blue header with your bee-themed Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="mt-6">{children}</main>
      </body>
    </html>
  );
}