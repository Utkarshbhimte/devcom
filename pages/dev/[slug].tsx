import React from "react";
import { fetchRelative } from "../../util/fetchRelative";
import { NextSeo } from "next-seo";
import DeveloperPageComponent from "../../components/DeveloperPageComponent/DeveloperPageComponent";
import { UserData } from "../../util/contracts";

interface DevPageProps {
  data: UserData;
}
const DevPage: React.FC<DevPageProps> = ({ data }) => {
  return (
    <>
      <NextSeo title={`${data.displayName} | Devcom`} description={""} />
      <DeveloperPageComponent data={data} />
    </>
  );
};

export async function getServerSideProps({ req, query }) {
  const workId = query.slug;
  const res = await fetchRelative(req)(`/api/dev-details?id=${workId}`);
  const response = await res.json();
  return {
    props: { data: { ...(response.data || {}), id: workId } },
  };
}

export default DevPage;
