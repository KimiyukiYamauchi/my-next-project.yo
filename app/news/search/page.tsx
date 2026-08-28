import { getNewsList } from "@/app/_libs/microcms";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import NewsList from "@/app/_components/NewsList";
import SearchField from "@/app/_components/SearchField";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const resolvedParam = await searchParams;
  const { contents: news } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    q: resolvedParam.q,
  });

  return (
    <>
      <SearchField />
      <NewsList news={news} />
    </>
  );
}
