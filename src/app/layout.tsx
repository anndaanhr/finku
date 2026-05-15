import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({ variable: "--font-plus-jakarta", subsets: ["latin"], weight: ["400","500","600","700","800"] });

export const metadata: Metadata = {
  title: "FinKu — Kelola Keuangan Pribadi",
  description: "Aplikasi manajemen keuangan pribadi. Catat pemasukan, pengeluaran, dan pantau kesehatan finansial Anda.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={font.variable}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#F7F3EC', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
