import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/Login");
      }
    }
  };

  return (
    <>
      {" "}
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Real Time Chat!</h1>
          </div>
          <span className="input-span">Username</span>
          <input
            type="text"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <span className="input-span">Email</span>
          <input type="email" name="email" onChange={(e) => handleChange(e)} />
          <span className="input-span">Password</span>
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <span className="input-span">Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("https://theme.zdassets.com/theme_assets/678183/b7e9dce75f9edb23504e13b4699e208f204e5015.png");
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 10px;
    justify-content: center;
    font-family: system-ui;
    img {
      height: 5rem;
    }
    h1 {
      color: #ffffde;
    }
  }

  .input-span {
    color: #afb1b3;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #36393f;
    border-radius: 2px;
    padding: 3rem 2.5rem;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  }
  input {
    background-color: #e8f0fe;
    padding: 1rem;
    border: none;
    border-radius: 3px;
    height: 40px;
    width: 400px;
    font-size: 1rem;
    &:focus {
      outline: none;
      color: #ffffde;
      background-color: #202225;
      font-family: system-ui;
    }
  }
  button {
    background-color: #5865f2;
    color: #ffffde;
    margin: 20px 0;
    padding: 0.7rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 3px;
    font-size: 1rem;
    font-family: system-ui;
    &:hover {
      opacity: 0.5;
    }
  }
  span {
    color: #909295;

    font-size: 14px;
    font-family: system-ui;
    font-weight: bold;
    a {
      color: #03a8e9;
      text-decoration: none;
      font-weight: bold;
      font-family: system-ui;
      font-size: 14px;
      line-height: 16px;
    }
  }
`;
