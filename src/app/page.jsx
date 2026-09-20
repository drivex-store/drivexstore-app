import getHomePageData from "@libs/sanity/queries/HomePage/HomePageData";
import HeroSection from "@views/home/HeroSection";
import CardsSection from "@views/home/CardsSection";
import AnimatedListSection from "@views/home/AnimatedListSection";
import FeaturedWorkSection from "@views/home/FeaturedWorkSection";
import IndexedGridSection from "@views/home/IndexedGridSection";
import AccordionSection from "@views/home/AccordionSection";
import ContentBlockSection from "@views/home/ContentBlockSection";

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <>
      <HeroSection data={data?.hero} />
      <CardsSection data={data?.cards} />
      <AnimatedListSection data={data?.animatedList} />
      <FeaturedWorkSection data={data?.featuredWork} />
      <IndexedGridSection data={data?.indexedGrid} />
      <AccordionSection data={data?.accordion} />
      <ContentBlockSection data={data?.contentBlock} />
    </>
  );
}
