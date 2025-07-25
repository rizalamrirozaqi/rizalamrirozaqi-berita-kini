import NewsCarousel from "./Components/NewsCarousel";
import PopularNews from "./Components/PopularNews";
import Recomendation from "./Components/Recomendation";
import Banner from "./Components/Banner";

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

interface NewsPath {
  name: string;
  path: string;
}

interface Endpoint {
  name: string;
  paths: NewsPath[];
}

interface RootResponse {
  endpoints: Endpoint[];
}

export default async function Home() {
  const res = await fetch(base_url, { cache: "no-store" });
  const rootData: RootResponse = await res.json();
  const allPaths = rootData.endpoints.flatMap((ep) =>
    ep.paths.map((p) => ({
      path: p.path,
      category: p.name, 
      source: ep.name, 
    }))
  );

  const fetchNews = allPaths.map(async ({ path, category, source }) => {
    try {
      const res = await fetch(`${base_url}${path}`, { cache: "no-store" });
      const data = await res.json();
      const posts = data?.data?.posts || [];

      return posts.map((post: News) => ({
        ...post,
        category,
        source,
      }));
    } catch (err) {
      console.error(`Failed to fetch ${path}`, err);
      return [];
    }
  });

  const allPostsNested = await Promise.all(fetchNews);
  const allNews: News[] = allPostsNested.flat();

  if (allNews.length === 0) {
    return (
      <main className="p-4 text-center text-red-600">
        <p>Tidak ada berita yang tersedia saat ini.</p>
      </main>
    );
  }

  return (
    <main className="container w-full h-auto mx-auto  text-xs py-20">
      <NewsCarousel news={allNews.slice(0, 5)} />
      <PopularNews news={allNews.slice(5, 8)} direction="row"/>
      <Recomendation news={allNews.slice(8, 80)} />
      <Banner />
    </main>
  );
}
