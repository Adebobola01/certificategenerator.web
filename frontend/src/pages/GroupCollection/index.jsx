import React from "react";
import { useOutlet, useOutletContext } from "react-router-dom";
import HeroSection from "../Dashboard/HeroSection";

const GroupCollection = () => {
  const [dashboardData, setDashboardData] = useOutletContext();
  //? useOutlet
  console.log(dashboardData);

  return (
    <div>
      sdlmksjhd
      {/* <HeroSection
        file={file}
        profilePic={profilePic}
        UploadVector={UploadVector}
        onFileChange={onFileChange}
        ShortId={ShortId}
        sub={sub}
      /> */}
    </div>
  );
};

export default GroupCollection;
