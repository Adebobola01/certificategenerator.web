import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.style.scss";
import SidebarDashboard from "../../assets/svgs/sidebar-dashboard.svg";
import SidebarDashboardActive from "../../assets/svgs/sidebar-dashboard-active.svg";
import SidebarGroupCollections from "../../assets/svgs/sidebar-group-collections.svg";
import SidebarGroupCollectionsActive from "../../assets/svgs/sidebar-group-collections-active.svg";
import SidebarPayment from "../../assets/svgs/sidebar-payment.svg";
import SidebarPaymentActive from "../../assets/svgs/sidebar-payment-active.svg";
import SidebarSettings from "../../assets/svgs/sidebar-settings.svg";
import SidebarSettingsActive from "../../assets/svgs/sidebar-settings-active.svg";
import LogoutIcon from "../../assets/svgs/logout-icon.svg";
import ProfilePic from "../../assets/images/profile-pic.png";
import { Logo } from "../../Component";

const Sidebar = () => {
  const [activeSidebar, setActiveSidebar] = useState(1);
  const navigate = useNavigate();

  const sidebarData = [
    {
      id: 1,
      img: SidebarDashboard,
      activeIMG: SidebarDashboardActive,
      p: "Dashboard",
      alt: "sidebar-dashboard",
      path: "/dashboard"
    },
    {
      id: 2,
      img: SidebarGroupCollections,
      activeIMG: SidebarGroupCollectionsActive,
      p: "Group Collections",
      alt: "sidebar-group-collections",
      path: "/dashboard/group-collections"
    },
    {
      id: 3,
      img: SidebarPayment,
      activeIMG: SidebarPaymentActive,
      p: "Payments",
      alt: "sidebar-payments"
      // path: "/dashboard/payments"
    },
    {
      id: 4,
      img: SidebarSettings,
      activeIMG: SidebarSettingsActive,
      p: "Settngs",
      alt: "sidebar-settings"
      // path: "/dashboard/settings"
    }
  ];

  function activeSidebarHandler(id, path) {
    setActiveSidebar(id);
    if (path) {
      navigate(`${path}`);
    }
  }

  return (
    <div id="Sidebar">
      <div className="upper">
        <Logo />
        <div className="main">
          {sidebarData.map(item => (
            <div
              key={item.id}
              className={`${item.id === activeSidebar ? "active" : ""}`}
              onClick={() => activeSidebarHandler(item.id, item.path)}
            >
              <img
                src={item.id === activeSidebar ? item.activeIMG : item.img}
                alt={item.alt}
              />
              <p>{item.p}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="footer">
        <figure className="profile-pic">
          <img src={ProfilePic} alt="profile-pic" />
        </figure>
        <h5>joy dickson</h5>
        <p>James.ir13@gmail.com </p>
        <div className="logout">
          <img src={LogoutIcon} alt="logout-icon" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
