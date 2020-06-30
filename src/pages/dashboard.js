import React from "react";
import DashboardPlaceholder from "components/DashboardPlaceholder";
import { requireAuth } from "util/auth.js";

function DashboardPage(props) {
  return (
    <DashboardPlaceholder
      color="white"
      size="large"
      title="Dashboard"
      subtitle="Dashboard components are coming to the Divjoy library soon. For now, you can implement a custom dashboard here after exporting your code."
    ></DashboardPlaceholder>
  );
}

export default requireAuth(DashboardPage);
