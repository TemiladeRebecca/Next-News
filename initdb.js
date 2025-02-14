//
import sql from 'better-sqlite3';
const db = sql('./public/news.db');

const DUMMY_NEWS = [
    {
      slug: 'will-ai-replace-humans',
      title: 'Will AI Replace Humans?',
      image: 'ai-robot.jpg',
      date: '2021-07-01',
      content:
        'Since late 2022 AI is on the rise and therefore many people worry whether AI will replace humans. The answer is not that simple. AI is a tool that can be used to automate tasks, but it can also be used to augment human capabilities. The future is not set in stone, but it is clear that AI will play a big role in the future. The question is how we will use it.',
    },
    {
      slug: 'beaver-plague',
      title: 'A Plague of Beavers',
      image: 'beaver.jpg',
      date: '2022-05-01',
      content: 'Beavers are taking over the world. They are building dams everywhere and flooding entire cities. What can we do to stop them?',
    },
    {
      slug: 'landscape',
      title: 'The beauty of landscape',
      image: 'landscape.jpg',
      date: '2022-07-01',
      content: 'Landscape photography is a great way to capture the beauty of nature. It is also a great way to get outside and enjoy the great outdoors. So what are you waiting for? Get out there and start taking some pictures!',
    },
    {
      slug: 'hiking',
      title: 'Hiking is the best!',
      image: 'hiking.jpg',
      date: '2024-01-01',
      content: 'Hiking is a great way to get some exercise and enjoy the great outdoors. It is also a great way to clear your mind and reduce stress. So what are you waiting for? Get out there and start hiking!',
    },
    {
      slug: 'couple-cooking',
      title: 'Spend more time together!',
      image: 'couple-cooking.jpg',
      date: '2024-03-01',
      content: 'Cooking together is a great way to spend more time with your partner. It is fun and you get to eat something delicious afterwards. What are you waiting for? Get cooking!',
    },
    {
      slug: 'smiling-baby',
      title: 'The magic of a smiling baby',
      image: 'baby.jpg',
      date: '2025-02-14',
      content: 'A baby smiling is more than just adorable. It is a universal symbol of joy and innocence. Studies show that a smiling baby can trigger happiness in adults, creating a deep emotional bond. It is a natural wonder that brings warmth to the heart, reminding us of the purest joys in life. No wonder we cannot help but smile back!',
    },
    {
      slug: 'family',
      title: 'The heart of the table',
      image: 'family.jpg',
      date: '2025-02-14',
      content: 'A meal is more than just food on a plate. Tt is a moment of connection, laughter, and love. Around the table, families share stories, celebrate wins, and support one another through challenges in life. It is a reminder that no one is truly alone. Whether it is a simple home-cooked dinner or a special feast, the act of sharing a meal strengthens bonds and creates lasting memories. In a world that moves fast, the dinner table remains a place where love, togetherness, and belonging thrive.',
    },
  ];

  db.prepare(`
    CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        image TEXT NOT NULL,
        date INTEGER NOT NULL,
        content TEXT NOT NULL
    )
`).run();

async function initData() {
    const stmt = db.prepare(`
        INSERT OR IGNORE INTO news VALUES (
        null,
        @slug,
        @title,
        @image,
        @date,
        @content
        )
    `)
   for (const News of DUMMY_NEWS)  {
    stmt.run(News);
   }
}

initData();