import React from "react";
import { Link } from "react-router-dom";
import FoldersIMG from "../../../assets/images/folder-add.png";
import "./folders.style.scss";

const Folders = ({ name, slug }) => {
  const nameOfFolder = name || "HNGi9 Folder";
  const slugOfFolder = slug || "HNGi9 Folder";
  function openFolderHandler(folder) {}

  return (
    <Link
      to={`/dashboard/group-collections/${slugOfFolder}`}
      className="Folder"
      onClick={openFolderHandler}
    >
      <figure>
        <img src={FoldersIMG} alt="folder-add" />
      </figure>
      <h4>{nameOfFolder}</h4>
    </Link>
  );
};

export default Folders;
