import { getAllNews } from '@/lib/news';
import NewsList from '@/components/news-list';

export default async function NewsPage() {

    const news = await getAllNews();
    return <>
    <h1 className='news-header'>News Page</h1>
        <NewsList news={news}/>
    </>
}