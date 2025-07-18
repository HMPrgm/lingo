type ArticlePageProps = {
  params: { id: string };
};

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <div>
      <h1>Displaying Article</h1>
      <p>This is the page for article with ID: {params.id}</p>
    </div>
  );
}