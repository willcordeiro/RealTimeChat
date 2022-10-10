import React, { useState, useEffect } from "react";
import styled from "styled-components";
import image from "../assets/chatRealTimeIcon.png";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={image} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffde;
  font-family: system-ui;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #ec517f;
  }
`;
