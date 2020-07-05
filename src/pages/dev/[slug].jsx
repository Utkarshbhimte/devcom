import React from "react";
import { fetchRelative } from "util/fetchRelative";
import { NextSeo } from "next-seo";
import DeveloperPageComponent from "components/DeveloperPageComponent/DeveloperPageComponent";

const DevPage = ({ data }) => {
  console.log("DevPage -> data", data);
  return (
    <>
      <NextSeo title={` | Devcom`} description={""} />
      <DeveloperPageComponent data={data} />
    </>
  );
};

export async function getServerSideProps({ req, query }) {
  const workId = query.slug;
  const res = await fetchRelative(req)(`/api/dev-details?id=${workId}`);
  const response = await res.json();
  return {
    props: { data: { ...(response.data || {}), id: workId } }, // will be passed to the page component as props
  };
}

export default DevPage;
