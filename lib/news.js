//
import path from "path";
import betterSqlite3 from "better-sqlite3";

// Open SQLite database
function openDatabase() {
  const dbPath = path.resolve(process.cwd(), 'public', 'news.db');
  return new betterSqlite3(dbPath);
}

export async function getAllNews() {
  const db = openDatabase();
  const news = db.prepare("SELECT * FROM news").all();
  db.close();
  await new Promise(resolve => setTimeout(resolve, 2000));
  return news;
}

export function getNews(slug) {
  const db = openDatabase();
  const news = db.prepare("SELECT * FROM news WHERE slug = ?").get(slug);
  db.close();
  return news;
}

export function getLatestNews() {
  const db = openDatabase();
  const news = db.prepare("SELECT * FROM news").all()
  return news.slice(-3);
}

export function getAvailableNewsYears() {
  const db = openDatabase();
  const news = db.prepare("SELECT * FROM news").all();
  return news.reduce((years, news) => {
    const year = new Date(news.date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year) {
  const db = openDatabase();
  const news = db.prepare("SELECT * FROM news").all();
  return news.reduce((months, news) => {
    const newsYear = new Date(news.date).getFullYear();
    if (newsYear === +year) {
      const month = new Date(news.date).getMonth();
      if (!months.includes(month)) {
        months.push(month + 1);
      }
    }
    return months;
  }, []).sort((a, b) => b - a);
}

export function getNewsForYear(year) {
  const db = openDatabase();
  const news = db.prepare("SELECT * FROM news").all();
  return news.filter(
    (news) => new Date(news.date).getFullYear() === +year
  );
}

export function getNewsForYearAndMonth(year, month) {
  const db = openDatabase();
  const news = db.prepare("SELECT * FROM news").all();
  return news.filter((news) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === +year && newsMonth === +month;
  });
}