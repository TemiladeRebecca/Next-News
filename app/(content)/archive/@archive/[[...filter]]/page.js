import Link from 'next/link'
import NewsList from '@/components/news-list'
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/lib/news';

export default async function FilteredNewsPage({params}) {
    const filter = params.filter;

    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];

    let news;
    let Links = await getAvailableNewsYears();

    if (selectedYear && !selectedMonth) {
        news = getNewsForYear(selectedYear);
        Links = getAvailableNewsMonths(selectedYear);
    }

    if (selectedYear && selectedMonth) {
        news = getNewsForYearAndMonth(selectedYear, selectedMonth);
        Links = [];
    }

    let newsContent;

    if (news && news.length > 0) {
        newsContent = <NewsList news={news}/>
    } 

    if (
        (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
        (selectedMonth && 
            !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
    ) {
        throw new Error('Invalid filter');
    }

    return (
        <>
    <header id="archive-header">
    <nav>
        <ul>
            {Links.map((link) => {
            const href = selectedYear ? `/archive/${selectedYear}/${link}`
            : `/archive/${link}`;
           return (
                <li key={link}>
                <Link href={href}>{link}</Link>
            </li>
        )}
        )}
        </ul>
    </nav>
</header>
{newsContent}
</>
 );
}