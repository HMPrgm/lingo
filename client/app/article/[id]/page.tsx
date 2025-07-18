'use client';
import { useEffect, useState } from "react";
import { difficultyColors } from "../article_card";
import { ArrowLeft } from '../../_components/icons';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  tags: string[];
  language?: string;
}

type ArticlePageProps = {
  params: { id: string };
};

const a: Article = {
  id: 1,
  title: 'A Trip to the Local Market',
  excerpt: 'Discover common phrases and vocabulary for shopping for groceries and interacting with vendors.',
  imageUrl: 'https://placehold.co/800x400/a7f3d0/14532d?text=Market+Trip',
  category: 'Daily Life',
  difficulty: 'A1',
  tags: ['Shopping', 'Food', 'Conversation'],
};
const ac = `
Going to a local market is one of the best ways to immerse yourself in a new culture and practice your language skills. You'll encounter new sights, smells, and sounds. Let's walk through a typical visit.\nFirst, you'll want to know how to greet the vendors. A simple "Hello" or "Good morning" in the local language goes a long way. As you look at the produce, you might want to ask, "How much is this?" or "Is this fresh?"
`;

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [articleContent, setArticleContent] = useState<string>("");

  useEffect(() => {
    setArticle(a);
    setArticleContent(ac);
  }, []);

  if (!article) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">

        <main className="flex-grow flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-700">Article not found.</h1>
        </main>

      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">


      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-6">
          {/* Back to Articles Link */}
          <a href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 group">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Back to all articles</span>
          </a>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Article Content */}
            <div className="lg:col-span-2 bg-white rounded-lg">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
              {/* This is where the article text would go. Using dangerouslySetInnerHTML to render HTML from mock data */}
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: articleContent || '<p>Loading content...</p>' }}
              />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Article Info</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">Category</h4>
                    <p className="text-gray-800 font-medium">{article.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">Difficulty</h4>
                    <p className={`inline-block px-3 py-1 text-sm font-semibold rounded-md border ${difficultyColors[article.difficulty]}`}>
                      {article.difficulty}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span key={tag} className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}