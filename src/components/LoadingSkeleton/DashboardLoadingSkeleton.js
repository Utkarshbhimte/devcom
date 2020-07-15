import React from "react";
import Skeleton from "react-loading-skeleton";
import "./DashboardLoadingSkeleton.scss";
function DashboardLoadingSkeleton() {
    return (
        <>
            <div className="dashboard-greet">
                <Skeleton height={80} width={800} />
            </div>

            <div className="dashboard-projects">
                <div>
                    <div className="project-header">
                        <Skeleton width={200} />
                    </div>
                    <br />
                    <div className="project-container">
                        <div className="project-body">
                            <Skeleton width={200} height={30} />
                            <br />
                            <Skeleton width={400} />
                            <Skeleton width={300} />
                            <Skeleton width={350} />
                        </div>
                        <div className="project-body">
                            <Skeleton width={200} height={30} />
                            <br />
                            <Skeleton width={400} />
                            <Skeleton width={300} />
                            <Skeleton width={350} />
                        </div>
                        <div className="project-body">
                            <Skeleton width={200} height={30} />
                            <br />
                            <Skeleton width={400} />
                            <Skeleton width={300} />
                            <Skeleton width={350} />
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <div className="project-header">
                        <Skeleton width={200} />
                    </div>
                    <br />
                    <div className="project-container">
                        <div className="project-body">
                            <Skeleton width={200} height={30} />
                            <br />
                            <Skeleton width={400} />
                            <Skeleton width={300} />
                            <Skeleton width={350} />
                        </div>
                        <div className="project-body">
                            <Skeleton width={200} height={30} />
                            <br />
                            <Skeleton width={400} />
                            <Skeleton width={300} />
                            <Skeleton width={350} />
                        </div>
                        <div className="project-body">
                            <Skeleton width={200} height={30} />
                            <br />
                            <Skeleton width={400} />
                            <Skeleton width={300} />
                            <Skeleton width={350} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DashboardLoadingSkeleton;
