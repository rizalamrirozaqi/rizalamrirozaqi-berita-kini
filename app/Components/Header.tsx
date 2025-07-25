'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
        const isScrolled = window.scrollY > 10;
        setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
    <nav className={`w-full h-auto sticky top-0 transition-colors duration-300 border-b-2 flex justify-center z-90 ${scrolled ? "bg-blue-500 border-blue-200" : "bg-white border-gray-200"}`}>
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-4">
                <Image src="/img/logo.png" alt="Logo" width={40} height={40} className={`transition-transform duration-300 ${scrolled? "transform scale-90 brightness-0 invert" : "transform scale-100"}`}/>
                <h1 className={`text-md font-semibold ${scrolled ? "text-white" : "text-black"}`}>Berita Kini</h1>
            </div>

            <ul className="flex gap-2 md:gap-4 overflow-x-auto md:overflow-visible whitespace-nowrap text-sm scrollbar-hide">
                {[
                "Beranda",
                "Terbaru",
                "Hiburan",
                "Gaya Hidup",
                "Olahraga",
                "Nasional",
                "Internasional",
                ].map((item, idx) => (
                <li key={idx}>
                    <a href="#" className={`block px-3 py-2 rounded-md transition ${ scrolled ? "text-white hover:text-blue-200" : "text-gray-700 hover:text-blue-500"}`}>
                    {item}
                    </a>
                </li>
                ))}
            </ul>
        </div>
    </nav>
    );
}
