import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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

        navigate("/");
      }
    }
  };

  return (
    <>
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
            min="3"
          />
          <span className="input-span">Password</span>
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
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
