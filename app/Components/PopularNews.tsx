import Image from "next/image"
import Link from "next/link"

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
  layoutClassName?: string;  
}

export default function PopularNews({ news, className = "", layoutClassName = "" }: Props ) {
  return (
    <div className="carousel-berita w-full bg-white p-4">
      <h2 className="text-xl font-bold mb-4">Berita Terpopuler</h2>
      <div className={`w-full flex justify-center gap-4 ${layoutClassName}`}>
        {news.map((item, index) => (
          <Link href={{
              pathname: `/berita/${encodeURIComponent(item.title.slice(0, 30))}`,
              query: {
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnail,
                pubDate: item.pubDate,
                category: item.category ?? '',
              },
            }}
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg relative group hover:transform hover:scale-95 transition-all duration-300 flex flex-col items-start"
          >
            <span className="absolute -top-2 -left-2 rounded-full w-8 h-8 bg-gray-600 flex items-center justify-center text-white text-xl">
              {index + 1}
            </span>
            <Image
              width={1920}
              height={1080}
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-32 object-cover rounded mb-2 group-hover:transform group-hover:scale-95 transition-all duration-300"
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600 text-sm">{new Date(item.pubDate).toLocaleDateString()}</p>
            <span className="text-blue-500 hover:underline mt-2 block">
              {item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase() : ''}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
