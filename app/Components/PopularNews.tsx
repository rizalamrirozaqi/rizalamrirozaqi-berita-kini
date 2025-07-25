import Image from "next/image"
import Link from "next/link"
import { Dot } from "lucide-react"

interface News {
  title: string
  link: string
  pubDate: string
  thumbnail: string
  description: string
  category?: string;
}

interface Props {
  news: News[];
  className?: string;
  direction?: 'row' | 'col'; // 'row' untuk horizontal, 'col' untuk vertikal
}

export default function PopularNews({ news, className = "", direction = "col" }: Props) {
  const isRow = direction === 'row';

  return (
    <div className={`carousel-berita w-full bg-white ${className}`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-1 h-7 bg-blue-500 rounded-full"></div>
        <h1 className="text-lg font-semibold">Berita Terpopuler</h1>
      </div>

      <div className={`w-full flex ${isRow ? 'flex-row' : 'flex-col'} gap-4`}>
        {news.map((item, index) => (
          <div key={index} className={`flex ${isRow ? 'flex-row items-start' : 'flex-col'} w-full`}>
            <Link
              href={{
                pathname: `/berita/${encodeURIComponent(item.title.slice(0, 30))}`,
                query: {
                  title: item.title,
                  description: item.description,
                  thumbnail: item.thumbnail,
                  pubDate: item.pubDate,
                  category: item.category ?? '',
                },
              }} className={`w-full  ${isRow ? 'flex flex-col items-start' : 'flex flex-row items-center'}`}>

              <div className="flex flex-row gap-2 w-full group hover:scale-95 transition-all duration-300 hover:shadow-lg rounded-lg  relative">
                <span className="absolute rounded-full w-8 h-8 bg-gray-600 flex items-center justify-center text-white text-sm font-bold -top-2 -left-2 group-hover:scale-95 transition-all duration-300 z-10">
                  {index + 1}
                </span>
                <Image width={1920} height={1080} src={item.thumbnail} alt={item.title} className="object-cover rounded-xl w-32 h-32 group-hover:scale-95 transition-all duration-300"/>

                <div className={`flex flex-col justify-between ${isRow ? '' : ''}`}>
                  <h3 className="text-sm font-semibold leading-snug">{item.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1 mb-3">
                    {item.category && (
                      <span className="text-blue-500 font-medium">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase()}
                      </span>
                    )}
                    <Dot className="w-4 h-4 text-gray-400" />
                    <span>{new Date(item.pubDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="h-full">
              {index < news.length - 1 && (
                <div className={`${isRow ? 'w-px bg-gray-500/20 rounded-full h-20 mx-4 self-stretch' : 'w-full h-px my-4'} bg-gray-300`}></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
