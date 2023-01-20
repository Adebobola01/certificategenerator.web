import React from "react";

import CertificateTemplate1 from "../../../assets/images/certTemplates/template.svg";

function Template1({
  message,
  issuedBy,
  issueDate,
  awardeeName,
  certificateTitle,
}) {
  return (
    <div>
      <div id="certificateWrapper">
        <div
          id="container-wrapper"
          style={{ backgroundImage: `url(${CertificateTemplate1})` }}
        >
          <div className="certgo_title">
            {certificateTitle}CERTIFICATE OF APPRECIATION
            <div className="certgo_awardee">{awardeeName}JOY IRABOR</div>
            <div className="certgo_message">
              {message}Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.{" "}
            </div>
            <div className="certgo_issue">
              <div>{issueDate}20/01/2023</div>
              <div>{issuedBy}HNG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template1;
