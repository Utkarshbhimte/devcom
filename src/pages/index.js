import React from "react";
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
