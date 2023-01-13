import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  const handleLogin = async () => {
    let postData = { username: email, password: password };
    //console.log(postData);
    const response = await fetch(
      "https://staging-api.tracknerd.io/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    const data = await response.json();

    if (response.ok && data.user) {
      toast.success(`Welcome ${data.user.name}`);
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <div className="text-center">
                <img src="logo.png" style={{ width: "185px" }} alt="logo" />
              </div>
              <h3 className="fw-bold m-4 text-center">Login</h3>
              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Email address"
                id="email"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Password"
                id="password"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
              />

              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                className="mb-4"
                label="Remember password"
              />

              <MDBBtn size="lg" onClick={handleLogin}>
                Login
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
