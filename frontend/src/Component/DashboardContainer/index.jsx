import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../Component";

const DashboardContainer = () => {
  const [dashboardData, setDashboardData] = useState({});
  return (
    <div id="Dashboard-Container">
      <Sidebar />
      <Outlet context={[dashboardData, setDashboardData]} />
    </div>
  );
};

export default DashboardContainer;
