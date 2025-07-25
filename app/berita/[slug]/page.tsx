'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PopularNews from '@/app/Components/PopularNews';

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

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(`${base_url}antara/terbaru`, { cache: 'no-store' });
        const data = await res.json();
        const posts = data?.data?.posts?.slice(0, 3) || [];
        setPopularNews(posts);
      } catch (err) {
        console.error('Gagal fetch berita populer:', err);
      }
    };

    fetchPopular();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">Beranda</Link> {'>'} <a href="#" className="hover:underline">{category}</a> {'>'} Detail
      </div>
      <div className="container grid grid-cols-[3fr_1fr] gap-4">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{title}</h1>
          <p className="text-gray-500 text-sm mb-4">{new Date(pubDate).toLocaleString()}</p>

          {thumbnail && (
            <Image src={thumbnail} alt={title} width={1200} height={600} className="rounded-2xl mb-6 object-cover w-full h-auto"/>
          )}

          <article className="text-gray-800 leading-relaxed mb-8">
            {description.split('\n').map((para, idx) => (
              <p key={idx} className="mb-4">{para}</p>
            ))}
          </article>

          <section className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-1 h-7 bg-blue-500 rounded-full"></div>
              <p className='h-auto w-auto'>Komentar</p>
            </div>
            <div className="flex gap-3 mb-6">
              <Image width={150} height={150} src="/img/person1.jpg" alt="Avatar" className="w-10 h-10 rounded object-cover"/>
              <div className="flex-1">
                <textarea maxLength={50} placeholder="Apa yang ingin Anda tanyakan?" className="w-full p-3 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                <div className="flex justify-between items-center mt-2">
                  <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                    Kirim
                  </button>
                  <span className="text-gray-400 text-xs">0/50</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-start gap-3">
                  <Image width={150} height={150} src="/img/person3.jpg" alt="Ujang" className="w-10 h-10 rounded object-cover"/>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <p className="font-semibold text-black">UJANG YUSMEIDI S.P., M.Agr.</p>
                      <span className="text-gray-400 text-xs">• 28 Mar 2024 11:15</span>
                    </div>
                    <p className="text-sm text-gray-800">
                      Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh? Karena saya mau download
                      ada konfirmasi bahwa TOTP aktivasi salah. Bagaimana ya solusinya?
                    </p>
                    <button className="text-sm text-blue-500 mt-1 hover:underline">Balas</button>

                    <div className="mt-4 pl-6 border-l">
                      <div className="flex items-start gap-3">
                        <Image width={150} height={150} src="/img/person2.jpg" alt="Dina" className="w-10 h-10 rounded object-cover"/>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <p className="font-semibold text-black">DINA RIKHA RIYANAWATI, S.Pd</p>
                            <span className="text-gray-400 text-xs">• 28 Mar 2024 11:15</span>
                          </div>
                          <p className="text-sm text-gray-800">
                            saya mengunduh sertifikatnya kok juga belum bisa
                          </p>
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
            <h2 className="text-lg font-semibold mb-4">Berita Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border rounded p-3">
                  <Image src={thumbnail} alt="" width={400} height={200} className="rounded mb-2 object-cover w-full h-32" />
                  <h3 className="font-semibold text-sm">Judul Berita Terkait #{item}</h3>
                  <p className="text-xs text-gray-500">{new Date(pubDate).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="container">
          <PopularNews news={popularNews} layoutClassName="flex-col" />
        </div>
      </div>


    </main>
  );
}
