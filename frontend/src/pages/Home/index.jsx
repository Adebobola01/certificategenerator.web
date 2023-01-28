import React from "react";
import { Outlet } from "react-router-dom";

import Hero from "./Hero";
import BulkStep from "./BulkStep";
import Partners from "./Partners";
import Certificate from "./Certificate";
import Testimonials from "./Testimonials";
import useAppProvider from "../../hooks/useAppProvider";

const Home = () => {
  const {
    logo,
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

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Outlet />
      <Hero />
      <Certificate
        logo={logo}
        email={email}
        setLogo={setLogo}
        message={message}
        issuedBy={issuedBy}
        setEmail={setEmail}
        issueDate={issueDate}
        setMessage={setMessage}
        awardeeName={awardeeName}
        setIssuedBy={setIssuedBy}
        setIssueDate={setIssueDate}
        setAwardeeName={setAwardeeName}
        certificateTitle={certificateTitle}
        setCertificateTitle={setCertificateTitle}
      />
      <Partners />
      <BulkStep />
      <Testimonials />
    </div>
  );
};

export default Home;
