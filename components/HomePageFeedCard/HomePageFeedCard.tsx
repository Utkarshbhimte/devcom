import React from "react";
// import "./HomePageFeedCard.scss";
import { useUser } from "../../util/db";

import CommentIcon from "../../assets/message-square.svg";
import Link from "next/link";
import { formatFirebaseDate } from "../../util/date";
import { UserData, Work } from "../../util/contracts";

interface UserDetailChipProps {
  user?: UserData;
  subtitle?: string;
}
const UserDetailChip: React.FC<UserDetailChipProps> = ({ user, subtitle }) => {
  return (
    <Link href={`/dev/${user.uid}`}>
      <div className="flex items-center my-4">
        <figure className="h-12 w-12 mr-4">
          <img
            className="rounded-full"
            src={user?.photoURL}
            alt="Placeholder image"
          />
        </figure>
        <div className="media-content">
          <div className="text-base">{user?.displayName}</div>
          {subtitle && (
            <span className="text-gray-600 text-sm">{subtitle}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

interface HomePageFeedCardProps {
  data: Work;
}
const HomePageFeedCard: React.FC<HomePageFeedCardProps> = ({ data }) => {
  return (
    <div className="cursor-pointer">
      <Link href={`/work/${data.id}`}>
        <div>
          <div className="text-xs tracking-wide uppercase text-gray-600">
            {data.type}
          </div>
          <h4 className="text-xl">{data.title}</h4>
          {data.desc && !!data.desc.length && (
            <p className="text-sm mb-4 text-gray-600">{data.desc}</p>
          )}
        </div>
      </Link>
      <UserDetailChip
        subtitle={formatFirebaseDate(data.created)}
        user={data.ownerData}
      />
    </div>
  );
};

export default HomePageFeedCard;
