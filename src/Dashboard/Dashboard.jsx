import React from "react";

import DashboardHome from "./DashboardHome";
import DashboardLayout from "../Layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardHome />
    </DashboardLayout>
  );
};

export default Dashboard;