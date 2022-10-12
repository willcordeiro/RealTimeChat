import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <div>
              <span className="aroba">@</span>
            </div>
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()} className="grid-parent">
              <div className="inline-block-child">
                <img
                  src={
                    message.fromSelf
                      ? `data:image/svg+xml;base64,${currentUserImage}`
                      : `data:image/svg+xml;base64,${currentChat.avatarImage}`
                  }
                  className="subImage"
                />
              </div>
              <div className="inline-block-child">
                <h3 className="subName">
                  {message.fromSelf ? currentUserName : currentChat.username}
                </h3>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <div className="content ">{message.message}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput
        handleSendMsg={handleSendMsg}
        username={currentChat.username}
      />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6% 87% 2%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 2px solid #2c2f34;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      }
      .username {
        h3 {
          color: #ffffde;
          font-family: system-ui;
        }
      }
    }
  }
  .aroba {
    color: #8e9297;
    font-size: 25px;
    font-family: system-ui;
  }
  .grid-parent {
    margin: 10px;
    display: grid;
    grid-template-columns: 65px 1000px;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  .subImage {
    height: 3rem;
    background-color: #2f3136;
    border-radius: 50px;
  }
  .subName {
    color: #ffffde;
    font-family: system-ui;
    font-size: 16px;
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      background-color: #2e3338;
      width: 0.6rem;
      &-thumb {
        width: 0.6rem;
        border-radius: 1rem;
        background-color: #202225;
      }
    }
    .message {
      display: flex;
      align-items: center;
      font-size: 16px;
      .content {
        max-width: 40%;
        font-size: 1.1rem;
        border-radius: 17px;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-start;
      .content {
        font-family: system-ui;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        font-family: system-ui;
      }
    }
  }
`;
