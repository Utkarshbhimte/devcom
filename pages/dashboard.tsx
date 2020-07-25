import React from "react";
import { requireAuth } from "../util/auth";
import DashboardPageComponent from "../components/DashboardPageComponent/DashboardPageComponent";

export default requireAuth(DashboardPageComponent);
