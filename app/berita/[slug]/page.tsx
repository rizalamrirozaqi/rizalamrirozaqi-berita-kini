'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PopularNews from '@/app/Components/PopularNews';
import { Dot } from 'lucide-react';

const base_url = "https://api-berita-indonesia.vercel.app/";

interface News {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  category?: string;
  source?: string;
}

export default function DetailBerita() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const description = searchParams.get("description") || "";
  const thumbnail = searchParams.get("thumbnail") || "";
  const pubDate = searchParams.get("pubDate") || "";
  const category = searchParams.get("category") || "";

  const [popularNews, setPopularNews] = useState<News[]>([]);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_url}antara/terbaru`, { cache: 'no-store' });
        const data = await res.json();
        const posts: News[] = data?.data?.posts || [];

        setPopularNews(posts.slice(0, 3));
        setRelatedNews(posts.slice(3, 6));
      } catch (err) {
        console.error('Gagal fetch berita:', err);
      }
    };

    fetchNews();
  }, []);
  console.log("category:", searchParams.get("category"));


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">Beranda</Link> {'>'} <span className="hover:underline">{category}</span> {'>'} Detail
      </div>

      <div className="container grid md:grid-cols-[2fr_1fr] gap-4">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{title}</h1>
          <p className="text-gray-500 text-sm mb-4">{new Date(pubDate).toLocaleString()}</p>

          {thumbnail && (
            <Image src={thumbnail} alt={title} width={1200} height={600} className="rounded-2xl mb-6 object-cover w-full h-auto" />
          )}

          <article className="text-gray-800 leading-relaxed mb-8">
            {description.split('\n').map((para, idx) => (
              <p key={idx} className="mb-4">{para}</p>
            ))}
          </article>

          <section className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-1 h-7 bg-blue-500 rounded-full"></div>
              <h1 className='text-lg font-semibold'>Komentar</h1>
            </div>
            <div className="flex gap-3 mb-6">
              <Image width={150} height={150} src="/img/person1.jpg" alt="Avatar" className="w-10 h-10 rounded object-cover" />
              <div className="flex-1">
                <textarea maxLength={50} placeholder="Apa yang ingin Anda tanyakan?" className="w-full p-3 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                <div className="flex justify-between items-center mt-2">
                  <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Kirim</button>
                  <span className="text-gray-400 text-xs">0/50</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-start gap-3">
                  <Image width={150} height={150} src="/img/person3.jpg" alt="Ujang" className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <p className="font-semibold text-black">UJANG YUSMEIDI S.P., M.Agr.</p>
                      <span className="text-gray-400 text-xs">• 28 Mar 2024 11:15</span>
                    </div>
                    <p className="text-sm text-gray-800">
                      Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh? Karena saya mau download ada konfirmasi bahwa TOTP aktivasi salah. Bagaimana ya solusinya?
                    </p>
                    <button className="text-sm text-blue-500 mt-1 hover:underline">Balas</button>

                    <div className="mt-4 pl-6 border-l">
                      <div className="flex items-start gap-3">
                        <Image width={150} height={150} src="/img/person2.jpg" alt="Dina" className="w-10 h-10 rounded object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <p className="font-semibold text-black">DINA RIKHA RIYANAWATI, S.Pd</p>
                            <span className="text-gray-400 text-xs">• 28 Mar 2024 11:15</span>
                          </div>
                          <p className="text-sm text-gray-800">saya mengunduh sertifikatnya kok juga belum bisa</p>
                          <button className="text-sm text-blue-500 mt-1 hover:underline">Balas</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="w-full grid grid-cols-2">
              <div className="flex items-center space-x-4 mb-6 h-full w-full">
                <div className="w-1 h-7 bg-blue-500 rounded-full"></div>
                <h1 className='text-lg font-semibold'>Berita Terkait</h1>
              </div>
              <div className="flex justify-end items-center h-full w-full">
                <Link href="/berita" className="text-blue-500 px-4 py-2  border-1 border-blue-500 bg-blue-500/20 rounded-lg flex items-center h-auto hover:bg-blue-500 hover:text-white text-xs">Lihat Semua</Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedNews.map((item, index) => (
                <div key={index} className="rounded p-3 group hover:shadow-lg hover:scale-95 hover:transform duration-300 transition-all">
                  <Image src={item.thumbnail} alt={item.title} width={400} height={200} className="rounded mb-2 object-cover w-full h-32 group-hover:tranform group-hover:scale-95 duration-300 transition-all" />
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    {item.category && (
                      <span className="text-blue-500 font-medium">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase()}
                      </span>
                    )}
                    <Dot className="w-4 h-4 text-gray-400" />
                    <span>{new Date(item.pubDate).toLocaleDateString()}</span>
                  </div>             
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="container">
          <PopularNews news={popularNews} direction="col" />
        </div>
      </div>
    </main>
  );
}
