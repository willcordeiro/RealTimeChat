import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg, username }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder={`Message @${username}`}
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #36393f;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: #ffffde;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #b9bbbe;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #2f3136;
        border: transparent 2px solid;
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
          rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #2f3136;
          width: 5px;
          &-thumb {
            background-color: gray;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: gray;
        }
        .emoji-group:before {
          background-color: #2f3136;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 7px;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    font-family: system-ui;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: #ffffde;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      cursor: pointer;
      padding: 0.3rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #5f6166;
      border-radius: 7px;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: #b9bbbe;
      }
    }
  }
`;
