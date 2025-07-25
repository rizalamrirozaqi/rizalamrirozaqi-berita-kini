'use client';
import Image from "next/image";
import { useState, useEffect } from "react";

const banners = [
    "/img/banner.png",
    "/img/banner2.png",
    "/img/banner.png",
    "/img/banner2.png",
];

export default function Banner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container relative mx-auto px-4 py-10">
            <div className="overflow-hidden rounded-xl ">
                <Image width={1920} height={1080} src={banners[currentIndex]} alt={`Banner ${currentIndex + 1}`} className="w-full h-auto aspect-21/6 object-cover transition-all duration-700" priority />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, idx) => (
                <span key={idx} className={`w-2 h-2 rounded-full ${idx === currentIndex ? "bg-blue-500/70" : "bg-gray-500"} transition`} />
                ))}
            </div>
        </div>
    );
}