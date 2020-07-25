import React from "react";
// import "./HomePageFeedCard.scss";
import { useUser } from "../../util/db";

import CommentIcon from "../../assets/message-square.svg";
import Link from "next/link";
import { formatDate } from "../../util/date";
import { UserData } from "../../util/contracts";

interface UserDetailChipProps {
  user?: UserData;
  createdTime: number;
}
const UserDetailChip: React.FC<UserDetailChipProps> = ({
  user,
  createdTime,
}) => {
  return (
    <div className="flex items-center my-4">
      <figure className="h-8 w-8 mr-4">
        <img
          className="rounded-full"
          src={user?.photoURL}
          alt="Placeholder image"
        />
      </figure>
      <div className="media-content">
        <span className="text-vase">{user?.displayName}</span>
        {/* <span>{formatDate(createdTime)}</span> */}
      </div>
    </div>
  );
};

const HomePageFeedCard = ({ data }) => {
  return (
    <Link href={`/work/${data.id}`}>
      <div className="my-8">
        <div>
          <div className="text-sm tracking-wide uppercase text-gray-600">
            {data.type}
          </div>
          <h4 className="text-xl">{data.title}</h4>
          {data.desc && !!data.desc.length && (
            <p className="text-sm mb-4 text-gray-600">{data.desc}</p>
          )}
        </div>
        <UserDetailChip
          createdTime={data.created.seconds * 1000}
          user={data.ownerData}
        />
      </div>
    </Link>
  );
};

export default HomePageFeedCard;
