import React from "react";
import WorkPageComponent from "components/WorkPageComponent/WorkPageComponent";

const WorkPage = ({ data }) => {
  return <WorkPageComponent data={data} />;
};

export async function getServerSideProps(context) {
  const workId = context.query.slug;
  const res = await fetch(
    `http://localhost:3000/api/work-details?workId=${workId}`
  );
  const response = await res.json();
  return {
    props: { data: response.data }, // will be passed to the page component as props
  };
}

export default WorkPage;
