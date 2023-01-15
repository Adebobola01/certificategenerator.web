import React from "react";
import { useOutlet, useOutletContext } from "react-router-dom";
import HeroSection from "../Dashboard/HeroSection";
import "../Dashboard/dashboard.style.scss"; //? NOTE: I am importing this becasue the HeroSection component needs the styles in this file
import "./group-collection.style.scss";

const GroupCollection = () => {
  const [
    [file, setFile],
    profilePic,
    onFileChange,
    UploadVector,
    ShortId,
    sub
  ] = useOutletContext();

  console.log(file);
  return (
    <div className="dashboard">
      <HeroSection
        file={file}
        profilePic={profilePic}
        UploadVector={UploadVector}
        onFileChange={onFileChange}
        ShortId={ShortId}
        sub={sub}
      />
    </div>
  );
};

export default GroupCollection;
