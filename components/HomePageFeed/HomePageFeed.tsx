import React from "react";
// import "./HomePageFeed.scss";
import { useFeedData } from "../../util/db";
import HomePageFeedCard from "../../components/HomePageFeedCard/HomePageFeedCard";
import { getWorkList } from "../../util/serverDb";
import useSWR from "swr";
import { Work } from "../../util/contracts";

interface HomePageFeedProps {
  posts: Work[];
}
const HomePageFeed: React.FC<HomePageFeedProps> = (props) => {
  return (
    <div className="py-8 bg-white">
      <div className="container mx-auto">
        <h3 className="text-xl font-bold mb-4">Latest Posts</h3>

        {!props.posts?.length && (
          <div className="empty-feed">There are nothing here right now</div>
        )}
        <div className="max-w-xl grid gap-12 my-8">
          {props.posts?.map((data) => (
            <HomePageFeedCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageFeed;
