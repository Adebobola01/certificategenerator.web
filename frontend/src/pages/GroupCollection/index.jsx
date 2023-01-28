import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import HeroSection from "../Dashboard/HeroSection";
import "../Dashboard/dashboard.style.scss"; //? NOTE: I am importing this becasue the HeroSection component needs the styles in this file
import "./group-collection.style.scss";

import AddFolderIcon from "../../assets/svgs/add-folder-icon.svg";
import FilterBarSearchIcon from "../../assets/svgs/filter-bar-search-icon.svg";
import FilterBarSettingsIcon from "../../assets/svgs/filter-bar-settings-icon.svg";
import Folders from "./Folders";

const GroupCollection = () => {
  const [
    [file, setFile],
    profilePic,
    onFileChange,
    UploadVector,
    ShortId,
    sub
  ] = useOutletContext();

  const [focused, setFocused] = useState(false);

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
      <div className="top-bar">
        <div className="add-folder-btn">
          <img src={AddFolderIcon} alt="add-folder-icon" />
          <p>Create New Folder</p>
        </div>
        <div
          className="filter-bar"
          style={{ borderColor: `${focused ? "#19a68e" : "#6c6c70"}` }}
        >
          <div>
            <img src={FilterBarSearchIcon} alt="filter-bar-search-icon" />
            <input
              type="text"
              placeholder="Search folders"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <img src={FilterBarSettingsIcon} alt="filter-bar-settings-icon" />
        </div>
      </div>

      <div className="folder-container">
        <Folders />
        <Folders />
        <Folders />
      </div>
    </div>
  );
};

export default GroupCollection;
