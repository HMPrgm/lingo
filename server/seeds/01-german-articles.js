const articles = [
    {
        title: 'Meine erste Reise nach Paris',
        content: 'Letztes Jahr bin ich zum ersten Mal nach Paris gefahren. Die Stadt ist wunderschön. Ich habe den Eiffelturm gesehen und er war sehr hoch. Ich habe auch das Louvre-Museum besucht. Ich habe viele Croissants gegessen und in kleinen Cafés Kaffee getrunken. Das Wetter war schön und sonnig. Ich bin jeden Tag viel gelaufen. Es war ein wunderbarer Urlaub.',
        excerpt: 'Eine kurze und einfache Geschichte über den Besuch der berühmten Sehenswürdigkeiten von Paris, wie dem Eiffelturm und dem Louvre.',
        image_url: 'https://picsum.photos/id/1015/400/300',
        category: 'Reise',
        difficulty: 'A2',
        tags: ['paris', 'reise', 'frankreich', 'urlaub'],
        language: 'German',
    },
    {
        title: 'Was ist künstliche Intelligenz?',
        content: 'Künstliche Intelligenz (KI) ist ein Bereich der Informatik, der sich mit der Schaffung von Maschinen beschäftigt, die denken und lernen können. Es gibt verschiedene Arten, wie die schwache KI, die auf eine Aufgabe spezialisiert ist, und die starke KI, die ein menschenähnliches Bewusstsein hätte. Heutzutage nutzen wir KI in unseren Handys, bei Netflix-Empfehlungen und in vielen anderen Systemen.',
        excerpt: 'Eine Einführung in die Grundlagen der künstlichen Intelligenz, ihre Arten und ihre Auswirkungen auf unser tägliches Leben.',
        image_url: 'https://picsum.photos/id/10/400/300',
        category: 'Technologie',
        difficulty: 'B1',
        tags: ['ki', 'technologie', 'zukunft'],
        language: 'German',
    },
    {
        title: 'Die Wunder der Tiefsee',
        content: 'Die Tiefsee bleibt eine der am wenigsten erforschten Grenzen der Erde. Sie beherbergt eine Vielzahl einzigartiger Ökosysteme, wie hydrothermale Quellen, die Leben durch Chemosynthese statt durch Photosynthese ermöglichen. Hier gedeihen bizarre Kreaturen in völliger Dunkelheit und unter immensem Druck. Biolumineszente Organismen erhellen den Abgrund und nutzen Licht zur Kommunikation, zum Beutefang und zur Verteidigung. Die Untersuchung dieser Umgebungen liefert entscheidende Einblicke in die Ursprünge des Lebens und die Widerstandsfähigkeit von Organismen unter extremen Bedingungen.',
        excerpt: 'Entdecken Sie die geheimnisvollen Kreaturen und einzigartigen Ökosysteme, die unter dem enormen Druck und in der völligen Dunkelheit der tiefsten Teile unserer Ozeane gedeihen.',
        image_url: 'https://picsum.photos/id/1020/400/300',
        category: 'Wissenschaft',
        difficulty: 'B2',
        tags: ['ozean', 'meeresbiologie', 'wissenschaft', 'erkundung'],
        language: 'German',
    },
    {
        title: 'Mein Crêpes-Rezept',
        content: 'Für Crêpes braucht man Mehl, Eier, Milch und etwas Zucker. Ich mische alles in einer Schüssel. Ich erhitze eine Pfanne mit Butter. Ich gebe etwas Teig hinein. Der Crêpe ist goldbraun. Ich wende ihn. Fertig! Ich mag Crêpes mit Schokolade.',
        excerpt: 'Ein einfaches und leckeres Rezept, um zu Hause perfekte Crêpes zu machen. Einfach für jeden nachzukochen.',
        image_url: 'https://picsum.photos/id/1060/400/300',
        category: 'Essen',
        difficulty: 'A1',
        tags: ['küche', 'rezept', 'dessert'],
        language: 'German',
    },
    {
        title: 'Die Nuancen des globalen Lieferkettenmanagements',
        content: 'Ein effektives Management globaler Lieferketten erfordert ein tiefgreifendes Verständnis von Logistik, geopolitischen Risiken und wirtschaftlichen Schwankungen. Die moderne Lieferkette ist kein bloß linearer Prozess, sondern ein komplexes, vernetztes System, das anfällig für Störungen durch Handelspolitik, Naturkatastrophen und technologische Veränderungen ist. Folglich setzen Unternehmen zunehmend auf Strategien wie Multi-Sourcing und Near-Shoring, um Resilienz und Agilität aufzubauen.',
        excerpt: 'Eine Untersuchung der Komplexität, die mit dem Management moderner globaler Lieferketten verbunden ist, von logistischen Hürden bis hin zu geopolitischen Faktoren.',
        image_url: null,
        category: 'Wirtschaft',
        difficulty: 'C1',
        tags: ['wirtschaft', 'logistik', 'ökonomie', 'globalisierung'],
        language: 'German',
    },
];

export default async function germanArticlesSeed(pool) {

    for (const article of articles) {
        try {
            await pool.query(
                'INSERT INTO articles (title, content, excerpt, image_url, category, difficulty, tags, language) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [article.title, article.content, article.excerpt, article.image_url, article.category, article.difficulty, article.tags, article.language]
            );
            console.log(`Inserted article: ${article.title}`);
        } catch (error) {
            console.error(`Error inserting article: ${article.title}`, error);
        }
    }
}

