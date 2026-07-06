import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { QuickServices } from "@/components/home/QuickServices";
import { FeaturedTreatments } from "@/components/home/FeaturedTreatments";
import { ConditionsSlider } from "@/components/home/ConditionsSlider";
import { TreatmentsGrid } from "@/components/home/TreatmentsGrid";
import { WhyChoose } from "@/components/home/WhyChoose";
import { AboutBlock } from "@/components/home/AboutBlock";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { TeamGrid } from "@/components/home/TeamGrid";
import { Testimonials } from "@/components/home/Testimonials";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { FAQ } from "@/components/home/FAQ";
import { BlogPreview } from "@/components/home/BlogPreview";
import { BookCTA } from "@/components/home/BookCTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <QuickServices />
      <FeaturedTreatments />
      <ConditionsSlider />
      <TreatmentsGrid />
      <WhyChoose />
      <AboutBlock />
      <ProcessTimeline />
      <TeamGrid />
      <Testimonials />
      <GalleryPreview />
      <FAQ />
      <BlogPreview />
      <BookCTA />
    </>
  );
}
