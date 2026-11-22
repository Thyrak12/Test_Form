import type { Metadata } from "next";
import { Battambang } from "next/font/google";
import "./globals.css";

const battambang = Battambang({
  subsets: ["khmer"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-battambang",
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
    <html lang="km" className={`${battambang.variable} h-full antialiased`}>
      <body className={`${battambang.className} min-h-full flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
