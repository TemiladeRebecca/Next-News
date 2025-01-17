import Link from 'next/link';
import NewsList from '@/components/news-list';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';

export default async function FilteredNewsPage({ params }) {
  const { filter } = await params;

  // Extract and normalize year and month
  const selectedYear = filter?.[0]?.toString();
  const selectedMonth = filter?.[1]?.toString();

  // Fetch available years
  const availableYears = (await getAvailableNewsYears()).map(String);

  // Fetch available months for the selected year
  const availableMonths = selectedYear && availableYears.includes(selectedYear)
    ? (await getAvailableNewsMonths(selectedYear)).map(String)
    : [];

  // Validate the filter inputs
  if (
    (selectedYear && !availableYears.includes(selectedYear)) ||
    (selectedMonth && !availableMonths.includes(selectedMonth))
  ) {
    return <p>Invalid filter. Please provide a valid year or month.</p>;
  }

  // Fetch news based on the filter
  let news = [];
  let links = availableYears;

  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear);
    links = availableMonths;
  }

  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;
              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {<NewsList news={news} />}
    </>
  );
}
