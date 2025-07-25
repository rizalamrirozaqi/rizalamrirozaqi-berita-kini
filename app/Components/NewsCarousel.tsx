'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface News {
    title: string
    link: string
    pubDate: string
    thumbnail: string
    description: string
    category?: string;
}

export default function NewsCarousel({ news }: { news: News[] }) {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % news.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + news.length) % news.length)
  }

  const item = news[current]

  return (
    <div className="w-full bg-white px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center max-sm:min-h-[500px]">
        <div className='flex flex-col items-start h-full w-full'>
          <p className="text-sm md:text-lg text-gray-500">Headline</p>
          <h2 className="text-2xl md:text-5xl/15 font-bold mb-2">{item.title}</h2>
          <p className="text-gray-600 mb-2">{item.description}</p>
          <p className="text-sm text-gray-500 mb-2">{new Date(item.pubDate).toLocaleDateString()}</p>
          <Link href={{
            pathname: `/berita/${encodeURIComponent(item.title.slice(0, 30))}`,
            query: {
              title: item.title,
              description: item.description,
              thumbnail: item.thumbnail,
              pubDate: item.pubDate,
              category: item.category ?? '',
            },
          }} className="text-blue-600 hover:underline flex flex-row ">Baca Selengkapnya<span><ArrowUpRight className="w-4 h-4"/></span></Link>
        </div>
        <div>
          <Image width={1920} height={1080} src={item.thumbnail} alt={item.title} className="rounded-lg w-full h-full max-h-96 object-cover" />
        </div>
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4 text-sm text-gray-500">
        <button onClick={prevSlide}>&lt;</button>
        <span>{current + 1} dari {news.length}</span>
        <button onClick={nextSlide}>&gt;</button>
      </div>
    </div>
  )
}