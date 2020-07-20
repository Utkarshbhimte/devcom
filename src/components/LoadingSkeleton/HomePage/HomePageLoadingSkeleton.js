import React from "react";
import Skeleton from "react-loading-skeleton";
import "./HomePageLoadingSkeleton.scss";
export default function HomePageLoadingSkeleton() {
    return (
        <div className="container">
            <div className="latest-post">
                <Skeleton height={20} width={200} />
            </div>
            <br />
            <div className="post-container">
                <div className="post">
                    <Skeleton width={120} />
                    <Skeleton height={30} width={220} />
                    <div className="post-contents">
                        <Skeleton height={50} width={50} />
                        <div className="contents">
                            <Skeleton width={220} />
                            <Skeleton width={170} />
                        </div>
                    </div>
                </div>
                <br />
                <div className="post">
                    <Skeleton width={120} />
                    <Skeleton height={30} width={220} />
                    <div className="post-contents">
                        <Skeleton height={50} width={50} />
                        <div className="contents">
                            <Skeleton width={220} />
                            <Skeleton width={170} />
                        </div>
                    </div>
                </div>
                <br />
                <div className="post">
                    <Skeleton width={120} />
                    <Skeleton height={30} width={220} />
                    <div className="post-contents">
                        <Skeleton height={50} width={50} />
                        <div className="contents">
                            <Skeleton width={220} />
                            <Skeleton width={170} />
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </div>
    );
}
