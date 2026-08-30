import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

type Props = {
  params: {
    slug: string;
  };
  searchParams: Promise<{ dk?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  // params、searchParams は Promise なので await する必要がある
  const resolvedParams = await params;
  const resolvedsearchParams = await searchParams;

  const data = await getNewsDetail(resolvedParams.slug, {
    draftKey: resolvedsearchParams.dk,
  });

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data?.thumbnail?.url ?? ""],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  // params は Promise なので await する必要がある
  const resolvedParams = await params;
  const resolvedsearchParams = await searchParams;

  const data = await getNewsDetail(resolvedParams.slug, {
    draftKey: resolvedsearchParams.dk,
  }).catch(notFound);

  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/news">ニュース一覧へ</ButtonLink>
      </div>
    </>
  );
}
