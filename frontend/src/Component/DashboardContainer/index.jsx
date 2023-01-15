import React from "react";
import axios from "axios";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../Component";
import profilePic from "../../assets/svgs/default-brandkit.svg";
import UploadVector from "../../assets/images/uploadPage/uploadVector.svg";
import { Toast } from "../../Component/ToastAlert";

const DashboardContainer = () => {
  const [file, setFile] = useState();
  const accessToken = JSON.parse(localStorage.getItem("userData")).token;
  const baseURL = "https://api.certgo.app/api";
  const sub = JSON.parse(localStorage.getItem("userData")).subscription;
  const id = JSON.parse(localStorage.getItem("userData")).userId;
  const ShortId = id.slice(19, 24);

  const axiosPrivateKit = axios.create({
    baseURL,
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`
    }
  });

  // On file select (from the pop up)
  // Update the state
  const onUpdate = async image => {
    const formData = new FormData();
    formData.append("file", image);
    console.log(image);
    console.log(formData);
    try {
      const response = await axiosPrivateKit.put("/users/brand-kit", formData);
      console.log("Response", response);
      if (response.status === 404) {
        Toast.fire({
          icon: "error",
          title: "Page not found"
        });
      } else if (response.status === 401) {
        Toast.fire({
          icon: "error",
          title: "Request Failed"
        });
      } else if (response.status === 500) {
        Toast.fire({
          icon: "error",
          title: "Internal Server Error"
        });
      } else {
        setFile(response.data.brandkit);
        console.log(response.data.brandkit);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const onFileChange = async e => {
    e.preventDefault();
    setFile(URL.createObjectURL(e.target.files[0]));
    onUpdate(e.target.files[0]);
  };
  return (
    <div id="Dashboard-Container">
      <Sidebar />
      <Outlet
        context={[
          [file, setFile],
          profilePic,
          onFileChange,
          UploadVector,
          ShortId,
          sub
        ]}
      />
    </div>
  );
};

export default DashboardContainer;
