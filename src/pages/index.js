import React, { lazy, Suspense, useEffect, useState } from "react";
import ExplainBanner from "components/ExplainBanner/ExplainBanner";
// import HomePageFeed from "components/HomePageFeed/HomePageFeed";
import HomePageLoadingSkeleton from "../components/LoadingSkeleton/HomePage/HomePageLoadingSkeleton";

const HomePage = lazy(() => import("../components/HomePageFeed/HomePageFeed"));

function IndexPage() {
    const [isFront, setIsFront] = useState(false);

    useEffect(() => {
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        });
    });

    if (!isFront) {
        return null;
    }
    return (
        <>
            {/* Explaination Banner */}
            <ExplainBanner />

            {/* News Feed */}
            <Suspense fallback={<HomePageLoadingSkeleton />}>
                <HomePage />
            </Suspense>
        </>
    );
}

export default IndexPage;
