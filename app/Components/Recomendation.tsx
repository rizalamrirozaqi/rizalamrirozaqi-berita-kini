'use client';
import Image from "next/image";
import { useState } from "react";
import { Dot, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface News {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  category?: string;
}

interface Props {
  news: News[];
}

export default function Recomendation({ news }: Props) {
  const sortedNews = [...news].sort((a, b) => {
    const aIsNasional = a.category?.toLowerCase().includes("nasional") ? 1 : 0;
    const bIsNasional = b.category?.toLowerCase().includes("nasional") ? 1 : 0;
    return bIsNasional - aIsNasional;
  });

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);


  
  {/* Pagination Section :v ------------------------------------------------------------------------------------- */}
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedNews = sortedNews.slice(startIdx, startIdx + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const generatePageNumbers = () => {
    const delta = 2;
    const range = [];

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-1 h-7 bg-blue-500 rounded-full"></div>
        <h1 className='text-lg font-semibold'>Rekomendasi Untuk Anda</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginatedNews.map((item, idx) => (
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
            key={idx} className="p-4 rounded-lg hover:shadow-lg transition-shadow group hover:scale-95 transition-alll duration-300">
            <Image width={1920} height={1080} src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover rounded group-hover:transform group-hover:scale-95 transition-alll duration-300" />
            <h3 className="text-sm font-semibold mt-2 line-clamp-2">{item.title}</h3>
            <div className="flex items-center gap-1 mt-1">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs font-semibold">
                {item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase() : ''}
              </a>
              <Dot className="text-gray-400 w-4 h-4" />
              <p className="text-xs text-gray-500">
                {new Date(item.pubDate).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>


      {/* Pagination Section :v ------------------------------------------------------------------------------------- */}
      <div className="flex justify-between items-center mt-6 flex-wrap text-sm text-gray-700">
        <p className="mb-2 md:mb-0">
          Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, sortedNews.length)} of {sortedNews.length} results
        </p>

        <div className="flex gap-1 items-center">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 disabled:opacity-50 enabled:hover:text-blue-500 flex flex-row w-auto h-auto items-center">
            <ArrowLeft width={12} height={12}/>
            <span>Previous</span>
          </button>

          {generatePageNumbers().map((page) => (
            <button key={page} onClick={() => goToPage(page)} className={`px-3 py-1 rounded ${ currentPage === page ? "bg-blue-500 text-white" : "hover:text-blue-400" }`}>
              {page}
            </button>
          ))}

          {currentPage + 1 < totalPages && <span className="px-2">...</span>}

          {totalPages > currentPage + 1 && (
            <button onClick={() => goToPage(totalPages)} className="px-3 py-1 rounded hover:text-blue-400">
              {totalPages}
            </button>
          )}

          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 disabled:opacity-50 enabled:hover:text-blue-500 flex flex-row w-auto h-auto items-center">
            <span>Next</span>          
            <ArrowRight width={12} height={12}/>
          </button>
        </div>
      </div>
    </div>
  );
}
