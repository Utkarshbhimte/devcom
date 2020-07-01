import React from "react";
import HeroSection from "components/HeroSection";
import ClientsSection from "components/ClientsSection";
import FeaturesSection from "components/FeaturesSection";
import TestimonialsSection from "components/TestimonialsSection";
import NewsletterSection from "components/NewsletterSection";
import { useRouter } from "next/router";
import ExplainBanner from "components/ExplainBanner/ExplainBanner";
import HomePageFeed from "components/HomePageFeed/HomePageFeed";

function IndexPage(props) {
  const router = useRouter();

  return (
    <>
      {/* Explaination Banner */}
      <ExplainBanner />

      {/* News Feed */}
      <HomePageFeed />
    </>
  );
}

export default IndexPage;
