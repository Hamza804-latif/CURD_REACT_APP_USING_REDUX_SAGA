import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UserInfo = () => {
  const { users } = useSelector((state) => state.data);
  const { id } = useParams();
  const navigate = useNavigate();
  let singleUser = users?.find((item) => item?.id === Number(id));

  return (
    <div style={{ margintop: "100px" }}>
      <div
        className="row"
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "450px",
          alignContent: "center",
        }}
      >
        <p className="col-md-12 fs-3">User Detail</p>
        <hr />
        <p className="col-md-6 fw-bold">ID:</p>
        <p className="col-md-6">{singleUser.id}</p>

        <p className="col-md-6 fw-bold">Name:</p>
        <p className="col-md-6">{singleUser.name}</p>

        <p className="col-md-6 fw-bold">Email:</p>
        <p className="col-md-6">{singleUser.email}</p>

        <p className="col-md-6 fw-bold">Phone:</p>
        <p className="col-md-6">{singleUser.phone}</p>

        <p className="col-md-6 fw-bold">Address:</p>
        <p className="col-md-6">{singleUser.address}</p>
        <MDBBtn onClick={() => navigate("/")} color="danger">
          Go Back
        </MDBBtn>
      </div>
    </div>
  );
};

export default UserInfo;
