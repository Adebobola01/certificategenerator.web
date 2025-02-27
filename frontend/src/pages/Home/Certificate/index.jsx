import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

import "./certificate.style.scss";
import UploadCSV from "../../UploadCSV";
import { ButtonLoader } from "../../../Component/";
import "react-datepicker/dist/react-datepicker.css";
import useAppProvider from "../../../hooks/useAppProvider";
import { AppProvider } from "../../../contexts/AppProvider";

export default function Certificate() {
  const navigate = useNavigate();
  const [date, setDate] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [bulkCertificate, setBulkCertificate] = useState(false);
  const {
    email,
    setLogo,
    message,
    issuedBy,
    setEmail,
    issueDate,
    setMessage,
    awardeeName,
    setIssuedBy,
    setIssueDate,
    setAwardeeName,
    certificateTitle,
    setCertificateTitle,
  } = useAppProvider();

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/preview");
    }, 3000);
  };
  const handleDate = date => {
    setDate(date);
    setIssueDate(formatDate(date));
  };
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear()
    ].join("/");
  }

  function filevalidation() {
    const fi = document.querySelector(".custom-file-input");
    // Check if any file is selected.
    const x = fi.files[0];
    const url = URL.createObjectURL(fi.files[0]);
    setLogo(url);
    if (fi.files.length > 0) {
      for (let i = 0; i <= fi.files.length - 1; i++) {
        const fsize = fi.files.item(i).size;
        const file = Math.round(fsize / 1024);
        document.querySelector("#file-size").textContent = `${file}KB`;
        document.querySelector(".name-of-file").textContent = `${x.name}`;
      }
    }
  }

  function uploadFileHandler() {
    document.querySelector(".custom-file-input").click();
  }

  function checkIfFieldIsEmpty() {
    const file = document.querySelector(".custom-file-input");
    const email = document.querySelector(".email-title").value;
    const certificateTitle = document.querySelector(".certificate-title").value;
    const awardeeName = document.querySelector(".awardee-name").value;
    const message = document.querySelector(".edication-or-message").value;
    const issuedBy = document.querySelector(".issued-by").value;

    if (
      file.files.length > 0 &&
      email.trim().length > 0 &&
      certificateTitle.trim().length > 0 &&
      awardeeName.trim().length > 0 &&
      message.trim().length > 0 &&
      issuedBy.trim().length > 0
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }

  return (
    <>
      <p id="certificatee" className="sora header">
        Create your <span>certificate </span>
        with <span>ease</span>
      </p>

      <p style={{ padding: "10px" }} className="prompt">
        Select a template, input values and Create a Certificate right away.
      </p>

      {bulkCertificate ? (
        <div className="flex justify-between mode">
          <button
            className="select"
            style={{
              color: "#222222",
              backgroundColor: "#ffffff",
              transition: "300ms ease-in"
            }}
            onClick={() => {
              setBulkCertificate(false);
            }}
          >
            Single <span className="mobile-none">Certificate</span>
          </button>
          <button
            className="select"
            onClick={() => {
              setBulkCertificate(true);
            }}
          >
            Bulk <span className="mobile-none">Certificate</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-between mode">
          <button
            className="select"
            onClick={() => {
              setBulkCertificate(false);
            }}
          >
            Single <span className="mobile-none">Certificate</span>
          </button>
          <button
            className="select"
            style={{
              color: "#222222",
              backgroundColor: "#ffffff",
              transition: "300ms ease-in"
            }}
            onClick={() => {
              setBulkCertificate(true);
            }}
          >
            Bulk <span className="mobile-none">Certificate</span>
          </button>
        </div>
      )}

      {bulkCertificate ? (
        <div>
          <form action="" className="cert-form text-left work-sans">
            <AppProvider>
              <UploadCSV />
            </AppProvider>
          </form>
        </div>
      ) : (
        <div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="cert-form text-left work-sans"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.1rem"
              }}
              className="file-input"
            >
              <label
                htmlFor="file"
                className="label"
                style={{ marginTop: "0px", marginBottom: "20px" }}
              >
                Logo
              </label>
              <div
                style={{ display: "flex", alignItems: "center" }}
                className="name_upload_container"
              >
                <span className="upload-file" onClick={uploadFileHandler}>
                  Upload Logo
                  <input
                    type="file"
                    name="uploadfile"
                    id="img"
                    className="custom-file-input"
                    style={{
                      width: "inherit",
                      padding: "0px",
                      border: "none",
                      position: "absolute"
                    }}
                    onMouseOver={uploadFileHandler}
                    title=" "
                    // value={logo}
                    onChange={() => {
                      filevalidation();
                      checkIfFieldIsEmpty();
                    }}
                  />
                </span>
                <p className="name-of-file"></p>
              </div>

              <p style={{ fontSize: "12px", margin: "0" }}>
                Image upload size: <span id="file-size"></span>
              </p>
            </div>

            <label htmlFor="text" className="label">
              Email
            </label>
            <input
              type="email"
              value={email}
              label={"Email"}
              className="email-title"
              onChange={e => {
                setEmail(e.target.value);
                checkIfFieldIsEmpty();
              }}
              placeholder="Enter the email address the certificate will be sent to"
            />

            <label htmlFor="text" className="label">
              Certificate Title
            </label>
            <input
              label={"Certificate Title"}
              className="certificate-title"
              type="text"
              placeholder="Certificate of completion"
              value={certificateTitle}
              onChange={e => {
                setCertificateTitle(e.target.value);
                checkIfFieldIsEmpty();
              }}
            />

            <label htmlFor="text" className="label">
              Awardee Name
            </label>
            <input
              label={"Awardee Name"}
              className="awardee-name"
              type="text"
              placeholder="Gabriel Prosper"
              value={awardeeName}
              onChange={e => {
                setAwardeeName(e.target.value);
                checkIfFieldIsEmpty();
              }}
            />

            <label htmlFor="text" className="label">
              Dedication or message
            </label>
            <input
              label={"Dedication or message"}
              className="edication-or-message"
              type="text"
              placeholder="For your exceptional performance this month."
              value={message}
              onChange={e => {
                setMessage(e.target.value);
                checkIfFieldIsEmpty();
              }}
            />

            <label htmlFor="text" className="label">
              Issued By
            </label>
            <input
              label={"Issued By"}
              className="issued-by"
              type="text"
              placeholder="Name of organisation or issuer"
              value={issuedBy}
              onChange={e => {
                setIssuedBy(e.target.value);
                checkIfFieldIsEmpty();
              }}
            />

            <label htmlFor="" className="label">
              Issue Date
            </label>
            <DatePicker
              selected={date}
              value={issueDate}
              onChange={handleDate}
              dateFormat="dd/MM/yyyy"
            />

            <button
              disabled={disabledButton}
              className={`${disabledButton && "btn-disabled"} btn-success`}
            >
              {loading ? <ButtonLoader /> : <span>Create Certificate</span>}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
