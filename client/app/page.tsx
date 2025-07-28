'use client';
import { useEffect, useState } from 'react'
import ArticleCard from './article/article_card';
import Article from './_types/article.type';



export default function page() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles');
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles();
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-12 md:py-16">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Welcome to Lingo!</h1>
            <p className="text-lg text-gray-600 mt-2">Improve your skills with articles tailored to your level.</p>
          </div>

          {/* Filters (Optional) */}
          <div className="mb-12 flex flex-col md:flex-row justify-center items-center gap-4">
            <select className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>All Difficulties</option>
              <option>A1</option>
              <option>A2</option>
              <option>B1</option>
              <option>B2</option>
              <option>C1</option>
              <option>C2</option>
            </select>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>

    </div>
  );
}

