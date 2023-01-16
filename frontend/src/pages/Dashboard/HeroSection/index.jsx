import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = ({
  file,
  profilePic,
  UploadVector,
  onFileChange,
  ShortId,
  sub
}) => {
  const navigate = useNavigate();
  return (
    <div className="dashboard__hero-section">
      <div className="dashboard__profile-pic-wrapper">
        <span className="dashboard__profile-pic">
          <img src={file || profilePic} alt="brand-kit" />
        </span>
        {/* <div className="ellipses" onClick={handleToggle}>
              <img src={Ellipse} alt="upload-icon" />
            </div> */}
        <div className="brandkit-upload">
          <label htmlFor="file" className="dashboard__upload-label">
            <img src={UploadVector} alt="upload" />
            <input
              type="file"
              id="file"
              accept="image/*"
              name="file"
              onChange={onFileChange}
            />
          </label>
        </div>
      </div>
      <div className="flexx">
        <div className="dashboard__align-start">
          <h3 className="dashboard__text">Welcome </h3>
          <h2
            style={{ textTransform: "capitalize" }}
            className="dashboard__title"
          >
            {/* {profileName ? profileName : `user - ${ShortId}`} */}
            {`user - ${ShortId}`}
          </h2>
          <p className="dashboard__description">
            Get a summary of all the Certificates here
          </p>
          <div>
            <p className="dashboard__plan dashboard__bold">
              Package: <span className="dashboard__bold">{sub}</span>
            </p>
          </div>
        </div>
        <div className="dashboard__btn">
          <button onClick={() => navigate("/pricing")}>Upgrade Account</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
