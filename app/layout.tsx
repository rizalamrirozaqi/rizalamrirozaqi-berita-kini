import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Header from "./Components/Header";
import { Facebook, Instagram, Send, Youtube } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Berita Kini",
  description: "Berita terkini Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Header />
        {children}
        <footer className="bg-[#273447] text-white py-8 px-4">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                  <div className="flex items-center gap-2 mb-2">
                      <Image width={150} height={150} src="/img/logo.png" alt="Logo" className="w-12 h-12 brightness-0 invert" />
                      <span className="text-lg font-semibold">Berita Kini</span>
                  </div>
                  <p className="text-xs mb-4">&copy; 2023 Berita Kini. All Rights Reserved.</p>
                  <p className="text-sm mb-2">Ikuti Kami</p>
                  <div className="flex gap-2">
                      <a href="#" className="bg-gray-200 rounded-lg p-2 text-gray-800 hover:bg-gray-800 hover:text-gray-200 group">
                          <Youtube className="group-hover:transform group-hover:scale-90 transition-all duration-700"/>
                      </a>
                      <a href="#" className="bg-gray-200 rounded-lg p-2 text-gray-800 hover:bg-gray-800 hover:text-gray-200 group">
                          <Instagram className="group-hover:transform group-hover:scale-90 transition-all duration-700"/>
                      </a>
                      <a href="#" className="bg-gray-200 rounded-lg p-2 text-gray-800 hover:bg-gray-800 hover:text-gray-200 group">
                          <Facebook className="group-hover:transform group-hover:scale-90 transition-all duration-700"/>
                      </a>
                  </div>
              </div>

              <div className="space-y-2 flex flex-col">
                  <h4 className="font-semibold mb-2">Telusuri</h4>
                  <ul className="space-y-1 text-sm flex flex-col">
                      <Link href={"#"} className="hover:text-gray-400 w-auto">Beranda</Link>
                      <Link href={"#"} className="hover:text-gray-400 w-auto">Kesehatan</Link>
                      <Link href={"#"} className="hover:text-gray-400 w-auto">Otomotif</Link>
                      <Link href={"#"} className="hover:text-gray-400 w-auto">Politik</Link>
                      <Link href={"#"} className="hover:text-gray-400 w-auto">Olahraga</Link>
                      <Link href={"#"} className="hover:text-gray-400 w-auto">Nasional</Link>
                      <Link href={"#"} className="hover:text-gray-400 w-auto">Internasional</Link>
                  </ul>
              </div>

              <div className="space-y-2 flex flex-col">
                  <h4 className="font-semibold mb-2">Bantuan</h4>
                  <ul className="space-y-1 text-sm flex flex-col">
                      <Link href={"#"} className="hover:text-gray-400 w-auto">Kontak Kami</Link>
                      <Link href={"#"} className="hover:text-gray-400 w-auto">Laporan Pembajakan</Link>
                      <Link href={"#"} className="hover:text-gray-400 w-auto">Kebijakan</Link>
                  </ul>
              </div>

              <div>
                  <h4 className="font-semibold mb-2">Berlangganan Berita Terbaru</h4>
                  <form className="flex mt-2 bg-white rounded-lg relative h-auto">
                      <input type="email" placeholder="Masukkan email" className="w-full px-3 py-5 rounded-l text-black text-sm"/>
                      <button type="submit" className="bg-blue-500 p-2 rounded text-white absolute right-2 flex items-center top-1/2 -translate-y-1/2 justify-center aspect-square">
                          <Send className="h8 w-8"/>
                      </button>
                  </form>
              </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
