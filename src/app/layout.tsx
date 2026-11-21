import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";

const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kantumruy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "តេស្តវាយតម្លៃបុគ្គលិកលក្ខណៈ និងអាជីព | Holland RIASEC Assessment",
  description: "ប្រព័ន្ធវាយតម្លៃបុគ្គលិកលក្ខណៈ និងចំណង់ចំណូលចិត្តអាជីពសិស្ស (Holland RIASEC Code)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="km" className={`${kantumruyPro.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
