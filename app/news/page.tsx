import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagenation from "@/app/_components/Pagination";
import SearchField from "../_components/SearchField";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

export default async function Page() {
  const { contents: news, totalCount } = await getNewsList();

  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <Pagenation totalCount={totalCount} />
    </>
  );
}
