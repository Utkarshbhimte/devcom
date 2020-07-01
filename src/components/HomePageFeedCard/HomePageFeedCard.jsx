import React from "react";
import "./HomePageFeedCard.scss";
import { useUser } from "util/db";

import commentIcon from "../../assets/message-square.svg";
import Link from "next/link";

const dateFormateOptions = { month: "long", day: "numeric", year: "numeric" };
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", dateFormateOptions).format(date);
}

const HomePageFeedCard = ({ data }) => {
  const { data: userData = {} } = useUser(data.owner);

  return (
    <div className="home-page-feed-card">
      <div className="heading">{data.type}</div>
      <h4 className="title is-4 card-title">{data.title}</h4>
      {data.desc && !!data.desc.length && (
        <p className="card-desc">{data.desc}</p>
      )}
      <div className="columns is-vcentered">
        <div className="column is-10">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={userData.photoURL} alt="Placeholder image" />
              </figure>
            </div>
            <div className="media-content">
              <p>{userData.displayName}</p>
              <span>{formatDate(data.created.seconds * 1000)}</span>
            </div>
          </div>
        </div>
        <div className="column">
          <Link href={`/work/${data.id}`}>
            <button class="button">
              <img src={commentIcon} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageFeedCard;
