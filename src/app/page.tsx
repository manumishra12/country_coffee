import { Hero } from "@/components/sections/hero";
import { MarqueeBanner } from "@/components/sections/marquee-banner";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { VideoHeroBand } from "@/components/sections/video-hero-band";
import { ParallaxShowcase } from "@/components/sections/parallax-showcase";
import { SketchSection } from "@/components/sections/sketch-section";
import { ProcessSteps } from "@/components/sections/process-steps";
import { BrandStory } from "@/components/sections/brand-story";
import { SplitParallax } from "@/components/sections/split-parallax";
import { CoffeeVideoSection } from "@/components/sections/coffee-video-section";
import { SubscriptionCTA } from "@/components/sections/subscription-cta";
import { Testimonials } from "@/components/sections/testimonials";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { Newsletter } from "@/components/sections/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <FeaturedProducts />
      <VideoHeroBand />
      <ParallaxShowcase />
      <SketchSection />
      <ProcessSteps />
      <BrandStory />
      <SplitParallax />
      <CoffeeVideoSection />
      <SubscriptionCTA />
      <Testimonials />
      <GalleryGrid />
      <Newsletter />
    </>
  );
}
