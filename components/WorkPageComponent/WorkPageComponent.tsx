import React, { useRef, useState } from "react";
// import "./WorkPage.scss";
import CommentSection from "../../components/CommentSection/CommentSection";
import { CommentInput } from "./CommentInput";
import { formatDate } from "../../util/date";
import Link from "next/link";

const WorkPageComponent = ({ data }) => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="my-8 max-w-3xl">
          <h3 className="text-xl">{data.title}</h3>
          <p className="text-sm text-grey-600">{data.desc}</p>

          <Link href={`/dev/${data.owner}`}>
            <div className="flex my-4 cursor-pointer">
              <figure className="h-12 w-12 mr-2">
                <img
                  className="rounded-full"
                  src={data.ownerData.photoURL}
                  alt={data.ownerData.displayName}
                />
              </figure>
              <div>
                <p className="text-base">{data.ownerData.displayName}</p>
                <span className="text-sm text-gray-600">
                  {formatDate(data.created._seconds * 1000)}
                </span>
              </div>
            </div>
          </Link>

          <div className="grid gap-4 grid-cols-3 max-w-2xl mt-8">
            {data.blogLink && data.blogLink.length && (
              <a
                href={data.blogLink}
                target="_blank"
                className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-primary text-base leading-6 font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Read it
              </a>
            )}
            {data.codeLink && data.codeLink.length && (
              <a
                href={data.codeLink}
                target="_blank"
                className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Code
              </a>
            )}
            {data.projectLink && data.projectLink.length && (
              <a
                href={data.projectLink}
                target="_blank"
                className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-primary text-base leading-6 font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Checkout the App
              </a>
            )}
          </div>
        </div>

        <div className="my-12 max-w-3xl">
          <h5 className="text-sm mb-4 tracking-wide text-gray-600 uppercase">
            Discussion
          </h5>
          <CommentInput workId={data.id} />
          <CommentSection workId={data.id} />
        </div>
      </div>
    </div>
  );
};

export default WorkPageComponent;
