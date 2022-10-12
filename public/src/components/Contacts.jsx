import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <h3>Real Time Chat</h3>
          </div>

          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6% 87% 7%;
  overflow: hidden;
  background-color: #2f3136;

  .brand {
    display: flex;
    border-bottom: 2px solid #2c2f34;
    align-items: center;
    justify-content: center;
    font-family: system-ui;
    background-color: #292b2f;

    img {
      height: 2rem;
    }
    h3 {
      color: #ffffde;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    font-family: system-ui;
    color: #fffff3;
    gap: 0.4rem;
    padding: 10px 0;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        width: 0.6rem;
        border-radius: 1rem;
        background-color: #202225;
      }
    }
    .contact {
      min-height: 2rem;
      cursor: pointer;
      width: 95%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      font-family: system-ui;
      color: #fffff3;
      gap: 1rem;
      align-items: center;
      .avatar {
        img {
          height: 3rem;
          background-color: #36393f;
          border-radius: 50px;
        }
      }
      .username {
        h3 {
          color: #ffffde;
        }
      }
    }
    .contact:hover {
      background-color: #36393f;
    }
    .selected {
      background-color: #36393f;
    }
  }
  .current-user {
    background-color: #292b2f;
    display: flex;
    justify-content: left;
    align-items: center;
    font-family: system-ui;
    color: #fffff3;
    font-weight: bold;
    gap: 1rem;
    padding: 10px;
    font-size: 0.7rem;
    .avatar {
      img {
        background-color: #36393f;
        border-radius: 50px;
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: #ffffde;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 0.5rem;
        }
      }
    }
  }
`;
