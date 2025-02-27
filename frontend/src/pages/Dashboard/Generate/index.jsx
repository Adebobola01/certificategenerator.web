import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";

import "./Generate.scss";
import { baseURL } from "../../../api/axios";
import Button from "../../../Component/button";
import {ButtonLoader} from "../../../Component";
import { Toast } from "../../../Component/ToastAlert";
import logo from "../../../assets/images/navbarIcon.png";

function Generate() {
  const [email, setEmail] = useState("");
  const [award, setAward] = useState("");
  const [awardee, setAwardee] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [signed, setSigned] = useState("");
  const [loading, setLoading] = useState(false);
  const getToken = JSON.parse(localStorage.getItem("userData"))

  const token = getToken.token;

  const userEventId = localStorage.getItem("_id");

  // REF FOR PNG AND PDF
  var certificateWrapper = React.createRef();

  const handleDownloadPdf = async () => {
    const element = certificateWrapper.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "l",
      unit: "pt",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${awardee}.pdf`);
  };

  useEffect(() => {
    if (awardee != null) {
      handleDownloadPdf();
    }
  }, [awardee]);

  const getCert = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      fetch(`${baseURL}/events/${userEventId}/certificates`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      }).then(async response => {
        const result = await response.json();

       
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          Toast.fire({
            icon: "success",
            title: "Certificate Generated"
          });
        } else if (response.status === 401 || response.status === 400) {
         setLoading(false)
          Toast.fire({
            icon: "error",
            title: "Email not found"
          });
        } 
        else if (response.status === 404) {
          setLoading(false)
          Toast.fire({
            icon: "error",
            title: "Email not found"
          });
        }
        
        else if (response.status === 500) {
          setLoading(false)
          Toast.fire({
            icon: "error",
            title: "Internal Server Error"
          });
        }
        else{
          setLoading(false)
          Toast.fire({
            icon: "error",
            title: "Something went wrong"
          });
        }
        const certData = result.data.certificate;
        setAward(certData.award);
        setAwardee(certData.name);
        setDescription(certData.description);
        setSigned(certData.signed);
        setDate(certData.date);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div id="generate-container">
      {/* START OF CERTIFICATE */}

      <div id="downloadWrapper" ref={certificateWrapper}>
        <div id="certificateWrapper">
          <div id="container-wrapper">
            <div id="container-design">
              <div className="sample3"></div>
              <div className="sample"></div>

              <div id="single-preview-card">
                <div id="single-preview-text">
                  <div id="preview-text">
                    <img src={logo} style={{ width: "40px" }} alt="logo" />
                    <h1>{award}</h1>

                    <p>THIS CERTIFIES THAT</p>
                    <h2>{awardee}</h2>
                    <h6>{description}</h6>
                  </div>

                  <div className="single-preview-issue">
                    <div className="issue-by">
                      <h6>{signed}</h6>
                      <div className="line"></div>
                      <p>ISSUED BY</p>
                    </div>

                    <div className="issue-by">
                      <h6>{date}</h6>
                      <div className="line"></div>
                      <p>ISSUE DATE</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sample2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* END OF CERTIFICATE */}
      <div className="generate-wrapper">
        <div>
          <div className="nav-logo">
            <h2>
              Cert<span>go</span>
            </h2>
            <img src={logo} alt="Certgo bulb" />
          </div>
          <h2>Fela music school 2022 graduate certificates</h2>
          <p>Enter your email address to get your certificate now</p>
        </div>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Email address"
        />

        <Button onClick={getCert}>{loading ? <ButtonLoader /> : 'Get certificate'}</Button>
      </div>
    </div>
  );
}

export default Generate;
