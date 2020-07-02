import React from "react";
import ExplainBanner from "components/ExplainBanner/ExplainBanner";
import HomePageFeed from "components/HomePageFeed/HomePageFeed";

function IndexPage() {
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
