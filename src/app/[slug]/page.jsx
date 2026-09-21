import { notFound } from "next/navigation";
import LegalPageSection from "@views/legal/LegalPageSection";
import { getLegalPageBySlug, getAllLegalPageSlugs } from "@libs/sanity/queries/LegalPage/LegalPageData";

export default async function LegalPage({ params }) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <LegalPageSection theme={page.theme} richText={page.richText} />;
}

export async function generateStaticParams() {
  const slugs = await getAllLegalPageSlugs();
  return (slugs || []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) {
    return { title: "Not found" };
  }

  return { title: page.title };
}
