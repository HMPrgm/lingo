'use client';
import { useEffect, useState, useRef, FC } from "react";
import { difficultyColors } from "../article_card";
import { ArrowLeft, XIcon } from '../../_components/icons';

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

const dictionary: { [key: string]: React.ReactNode } = {
    ciudad: <p>Paris is a very beautiful <strong>city</strong>, especially in the spring.</p>,
    explorar: <p>We love to <strong>explore</strong> the forest behind our house.</p>,
    calles: <p>The <strong>streets</strong> of Rome are filled with ancient history.</p>,
    museos: <p>We visited three <strong>museums</strong> during our trip to New York.</p>,
    cultura: <p>I am interested in learning about Japanese <strong>culture</strong>.</p>,
    comida: <p>My favorite type of <strong>food</strong> is Italian pasta.</p>,
};

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
<p>Explorar una nueva <strong>ciudad</strong> es una aventura emocionante. Puedes caminar por <strong>calles</strong> con mucha historia y ver edificios antiguos. Cada <strong>ciudad</strong> tiene su propia personalidad y encanto.</p><p>Una buena idea es visitar los <strong>museos</strong> locales. En los <strong>museos</strong>, aprendes sobre el arte y la <strong>cultura</strong> del lugar. También es importante probar la <strong>comida</strong> típica. Busca pequeños restaurantes donde comen los locales para tener una experiencia auténtica.</p><p>No necesitas un plan estricto. A veces, las mejores experiencias ocurren cuando simplemente decides <strong>explorar</strong> sin un destino fijo. ¡Disfruta tu viaje!</p>
`;

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [articleContent, setArticleContent] = useState<string>("");
  const [popupData, setPopupData] = useState<PopupData | null>(null);

  const handleWordClick = (word: string, x: number, y: number) => {
      const definition = dictionary[word];
      if (definition) {
          setPopupData({ content: definition, x, y });
      }
  };

  const closePopup = () => {
    setPopupData(null);
  };

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
      <WordPopup popupData={popupData} onClose={closePopup} />



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
            
              <InteractiveContent 
                htmlContent={articleContent} 
                onWordClick={handleWordClick}
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

interface PopupData {
    content: React.ReactNode;
    x: number;
    y: number;
}

interface InteractiveContentProps {
    htmlContent: string;
    onWordClick: (word: string, x: number, y: number) => void;
}

const InteractiveContent: FC<InteractiveContentProps> = ({ htmlContent, onWordClick }: InteractiveContentProps) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const container = contentRef.current;
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
        
        const textNodes: Node[] = [];
        let node;
        while(node = walker.nextNode()) {
            textNodes.push(node);
        }

        textNodes.forEach(textNode => {
            if (!textNode.parentElement || textNode.nodeValue?.trim() === '') return;

            const fragment = document.createDocumentFragment();
            const words = textNode.nodeValue?.split(/(\s+)/); // Split by spaces, keeping them

            words?.forEach(word => {
                if (word.trim().length > 0) {
                    const span = document.createElement('span');
                    span.textContent = word;
                    span.className = 'cursor-pointer hover:bg-yellow-200 rounded transition-colors duration-200';
                    span.onclick = (e) => {
                        e.stopPropagation();
                        const cleanWord = word.trim().replace(/[.,!?;:"']/g, '').toLowerCase();
                        if(dictionary[cleanWord]) {
                           onWordClick(cleanWord, e.clientX, e.clientY);
                        }
                    };
                    fragment.appendChild(span);
                } else {
                    fragment.appendChild(document.createTextNode(word)); // Append spaces
                }
            });
            textNode.parentElement.replaceChild(fragment, textNode);
        });
    }, [htmlContent, onWordClick]);

    return <div ref={contentRef} className="prose prose-lg text-xl tracking-wider leading-16 max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

interface WordPopupProps {
    popupData: PopupData | null;
    onClose: () => void;
}

const WordPopup: FC<WordPopupProps> = ({ popupData, onClose }) => {
    if (!popupData) return null;
    
    const popupRef = useRef<HTMLDivElement>(null);

    // Calculate position
    const style = {
        left: `${popupData.x}px`,
        top: `${popupData.y}px`,
        transform: 'translate(-50%, -110%)', // Position above the cursor
    };

    return (
        // Backdrop to close popup when clicking outside
        <div className="fixed inset-0 z-50" onClick={onClose}>
            <div 
                ref={popupRef}
                style={style}
                className="absolute bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-64 text-gray-700"
                onClick={e => e.stopPropagation()} // Prevent click inside from closing it
            >
                {popupData.content}
                <button onClick={onClose} className="absolute top-1 right-1 text-gray-400 hover:text-gray-700">
                    <XIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};