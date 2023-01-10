import React, { useState } from "react";
import {
  MDBValidation,
  MDBInput,
  MDBBtn,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserStart } from "../redux/actions";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { name, email, phone, address } = formValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (name && email && phone && address) {
      dispatch(createUserStart(formValue));
      toast.success("User Added Successfully");
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(name, value);
  };
  return (
    <MDBValidation
      className="g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <p className="fs-2 fw-bold" style={{ textAlign: "center" }}>
          Add User Detail
        </p>
        <MDBValidationItem feedback="Please provide a name" invalid>
          <MDBInput
            value={name}
            name="name"
            type="text"
            onChange={onInputChange}
            required
            label="Name"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please provide an email" invalid>
          <MDBInput
            value={email}
            name="email"
            type="email"
            onChange={onInputChange}
            required
            label="Email"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please provide a phone no." invalid>
          <MDBInput
            value={phone}
            name="phone"
            type="number"
            onChange={onInputChange}
            required
            label="Phone"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please provide an address" invalid>
          <MDBInput
            value={address}
            name="address"
            type="text"
            onChange={onInputChange}
            required
            label="Address"
          />
        </MDBValidationItem>
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px" }} type="submit">
            Add
          </MDBBtn>
          <MDBBtn onClick={() => navigate("/")} color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddEditUser;
