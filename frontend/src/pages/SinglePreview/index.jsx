import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { exportComponentAsPNG } from "react-component-export-image";

import "./singlepreview.style.scss";
import Modal from "../../Component/Modal";
import Button from "../../Component/button";
import Template1 from "./Templates/template1";
import Template2 from "./Templates/template2";
import Template3 from "./Templates/template3";
import { axiosFormData } from "../../api/axios";
import certificate from "../../assets/images/SinglePreview/certTemplate (1).png";
import certificate2 from "../../assets/images/SinglePreview/certTemplate (2).png";
import certificate3 from "../../assets/images/SinglePreview/certTemplate (3).png";

function SinglePreview({
  logo,
  email,
  message,
  issuedBy,
  issueDate,
  awardeeName,
  certificateTitle,
}) {
  const navigate = useNavigate();
  //STATES FOR TEMPLATES
  const [templateone, setTemplateOne] = useState(true);
  const [templatetwo, setTemplateTwo] = useState(false);
  const [templatethree, setTemplateThree] = useState(false);

  //FUNCTIONS TO HANDLE TEMPLATES

  const handleTemplate1 = () => {
    setTemplateOne(true);
    setTemplateTwo(false);
    setTemplateThree(false);
  };
  const handleTemplate2 = () => {
    setTemplateTwo(true);
    setTemplateOne(false);
    setTemplateThree(false);
  };
  const handleTemplate3 = () => {
    setTemplateThree(true);
    setTemplateOne(false);
    setTemplateTwo(false);
  };

  const [openModal, setOpenModal] = useState(false);
  const [isAuntheticated, setIsAuntheticated] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    localStorage.getItem("userData")
      ? setIsAuntheticated(true)
      : setIsAuntheticated(false);
  }, []);

  function handleUnloggedUsers(e) {
    e.preventDefault();
    setOpenModal(!openModal);
  }

  // const container = React.useRef(null);
  const pdfExportComponent = React.useRef(null);

  // const exportPDFWithMethod = () => {
  //   let element = container.current || document.body;
  //   savePDF(element, {
  //     paperSize: "auto",
  //     margin: 40,
  //     fileName: `Report for ${new Date().getFullYear()}`
  //   });
  // };
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  // REF FOR PNG AND PDF
  var certificateWrapper = React.createRef();

  // FUNCTION FOR HANDLING PDF DOWNLOAD

  // const handleDownloadPdf = async () => {
  //   const element = certificateWrapper.current;
  //   const canvas = await html2canvas(element);
  //   const data = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF({
  //     orientation: "l",
  //     unit: "pt",
  //     format: [canvas.width, canvas.height]
  //   });
  //   pdf.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);
  //   pdf.save(`${awardeeName}.pdf`);
  // };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });
  const handleSendCertificate = async e => {
    try {
      localStorage.getItem("userData")
        ? setIsAuntheticated(true)
        : setIsAuntheticated(false);

      if (!isAuntheticated) {
        setOpenModal(!openModal);
        setModalMessage("You need to sign up to send certificate to your mail");
        return;
      }
      // navigate("/comingsoon");
      const element = certificateWrapper.current;
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "l",
        unit: "pt",
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);

      // get token from localstorage
      const token = JSON.parse(localStorage.getItem("userData")).token;

      // create form data and add pdf
      let formData = new FormData();
      formData.append("file", data);

      // send the form data
      const uploadUrl = "/sendEmailNotifications";
      let response = await axiosFormData.post(uploadUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      // toast message
      const dataMsg = response.data;
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: dataMsg.message
        });
      } else if (response.status === 403) {
        Toast.fire({
          icon: "error",
          title: dataMsg.error
        });
      } else {
        Toast.fire({
          icon: "error",
          title: dataMsg.message
        });
        throw new Error(dataMsg.message);
      }
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: "Internal Server Error"
      });
    }
  };
  return (
    <div id="singlePreview">
      {/* IMAGE OF YOUR CERTIFICATE READY TO BE DOWNLOADED OR SENT */}

      <div className="certificate-header">
        <h4>Your certificate is ready!</h4>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          modalText={modalMessage}
        />
      </div>

      {/* START OF CERTIFICATE */}

      {/* <div className="example-config">
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={exportPDFWithComponent}
        >
          Export with component
        </button>
        &nbsp;
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={exportPDFWithMethod}
        >
          Export with method
        </button>
      </div> */}
      {/* <div className="border rounded p-2">
     
      </div> */}

      {templateone && (
        <PDFExport
          ref={pdfExportComponent}
          paperSize="auto"
          fileName={`${awardeeName}`}
          author="Certgo Team"
        >
          <div ref={certificateWrapper}>
            <Template1
              logo={logo}
              certificateTitle={certificateTitle}
              awardeeName={awardeeName}
              message={message}
              issuedBy={issuedBy}
              issueDate={issueDate}
            />
          </div>
        </PDFExport>
      )}
      {templatetwo && (
        <PDFExport
          ref={pdfExportComponent}
          paperSize="auto"
          fileName={`${awardeeName}`}
          author="Certgo Team"
          //scale = {0.6}
        >
          <div ref={certificateWrapper}>
            <Template2
              logo={logo}
              certificateTitle={certificateTitle}
              awardeeName={awardeeName}
              message={message}
              issuedBy={issuedBy}
              issueDate={issueDate}
            />
          </div>
        </PDFExport>
      )}
      {templatethree && (
        <PDFExport
          ref={pdfExportComponent}
          paperSize="auto"
          fileName={`${awardeeName}`}
          author="Certgo Team"
          //scale = {0.6}
        >
          <div ref={certificateWrapper}>
            <Template3
              logo={logo}
              certificateTitle={certificateTitle}
              awardeeName={awardeeName}
              message={message}
              issuedBy={issuedBy}
              issueDate={issueDate}
            />
          </div>
        </PDFExport>
      )}

      {/* END OF CERTIFICATE */}

      <div className="certificate-share-hero">
        {/* BUTTONS FOR EITHER SENDIMG OR DOWNLOADING */}

        <div className="buttons">
          <Button
            className="send-button"
            onClick={e => {
              handleSendCertificate(e);
            }}
          >
            Send Certificate
          </Button>
          <div className="dropdown">
            <button className="dropbtn download-button">
              Download Certificate
            </button>
            <div className="dropdown-content">
              <button
                onClick={e => {
                  e.preventDefault();
                  exportComponentAsPNG(pdfExportComponent, {
                    fileName: `${awardeeName}`,
                    html2CanvasOptions: { backgroundColor: "#fff" }
                  });
                }}
                className="png-button"
              >
                PNG
              </button>
              <button onClick={exportPDFWithComponent} className="pdf-button">
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER TEMPLATES TO CHOOSE FROM */}
      <h2>Even More Templates for you</h2>
      <div className="single-images">
        <img onClick={handleTemplate1} src={certificate2} alt="templates" />
        <img onClick={handleTemplate2} src={certificate} alt="templates" />
        <img onClick={handleTemplate3} src={certificate3} alt="templates" />
      </div>

      {/* BUTTON TO EXPLORE MORE TEMPLATES */}
      <Link to="/templates">
        <Button
          name="Explore More Templates"
          style={{ margin: " 2rem auto" }}
        ></Button>
      </Link>
    </div>
  );
}

export default SinglePreview;
