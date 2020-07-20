import React, { lazy, Suspense } from "react";
import { requireAuth } from "util/auth.js";
import DashboardLoadingSkeleton from "../components/LoadingSkeleton/Dashboard/DashboardLoadingSkeleton";

const Dashboard = lazy(() => import("../components/DashboardPlaceholder"));

function DashboardPage(props) {
    return (
        <>
            <Suspense fallback={<DashboardLoadingSkeleton />}>
                <Dashboard />
            </Suspense>
        </>
    );
}

export default requireAuth(DashboardPage);
