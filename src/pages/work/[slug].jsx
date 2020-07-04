import React from "react";
import WorkPageComponent from "components/WorkPageComponent/WorkPageComponent";
import { fetchRelative } from "util/fetchRelative";

const WorkPage = ({ data }) => {
  return <WorkPageComponent data={data} />;
};

export async function getServerSideProps({ req, query }) {
  const workId = query.slug;
  const res = await fetchRelative(req)(`/api/work-details?workId=${workId}`);
  const response = await res.json();
  return {
    props: { data: { ...(response.data || {}), id: workId } }, // will be passed to the page component as props
  };
}

export default WorkPage;
