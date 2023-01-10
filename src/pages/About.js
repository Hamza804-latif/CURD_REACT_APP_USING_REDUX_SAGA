import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";

const About = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <MDBTypography note noteColor="primary">
        This Application is simple CURD operations application using
        React,Redux-Saga, redux,react-router-dom,MD bootstrap 5,React-Toastify
        and Json-server
      </MDBTypography>
    </div>
  );
};

export default About;
