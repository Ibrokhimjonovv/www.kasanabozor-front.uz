import React, { useContext, useEffect, useRef, useState } from "react";

import "./index.scss";

import Loading from "../../components/LoaderComponent/loading";

import NoChats from "../../assets/messenger/no-chats.svg";
import Send from "../../assets/messenger/send.svg";

import { ChatContext } from "../../context/messenger";

import { onlineShopApi, usersApi } from "../../server";
import { UserContext } from "../../context/user";
import axios from "axios";

function convertTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const ProductMessage = ({ message }) => {
  const [product, setProduct] = useState(0);

  useEffect(() => {
    axios
      .get(`${onlineShopApi}mproduct/${message.content}/`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);

          setProduct(response.data);
        }
      });
  }, []);

  return product ? (
    <div className="message-product">
      <div className="product-image">
        <img
          src={`${onlineShopApi.split("/api")[0]}${product.image}`}
          alt="product image goes here"
        />
      </div>
      <div className="product-data">
        <h3 className="product-title">{product.title || "Yuklanmoqda..."}</h3>
        <p className="prodcut-price">
          <span>{formatPrice(product.price_discount || 0)}</span> SO'M
        </p>
        <p className="product-description">{product.short_description}</p>
      </div>
    </div>
  ) : (
    <div
      style={{
        width: "300px",
        height: "100px",
        marginBottom: "8px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Loading />
    </div>
  );
};

const Messaging = () => {
  const {
    chats,
    activeChat,
    activeChatId,
    chatHistory,
    loading,
    changeChat,
    sendMessage,
  } = useContext(ChatContext);
  const { guid } = useContext(UserContext);
  const [filteredChats, setFilteredChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const messagesDiv = useRef();

  let lastDate = null;

  useEffect(() => {
    document.title = "Xabarlar - Kasana.uz";
  }, [])

  useEffect(() => {
    if (searchQuery) {
      setFilteredChats(
        Array.from(chats).filter((value) =>
          `${value.display.first_name} ${value.display.last_name}`.includes(
            searchQuery
          )
        )
      );
    } else {
      setFilteredChats(chats);
    }
  }, [chats, searchQuery]);

  useEffect(() => {
    if (messagesDiv.current) {
      messagesDiv.current.scroll({
        top: messagesDiv.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (messageText && messageText.trim()) {
      sendMessage(messageText);
      setMessageText("");
    }
  };

  return (
    <>
      <div id="messenger">
        <div className="container">
          {chats.length !== 0 ? (
            <>
              <div className="chats">
                <div className="list">
                  <div className="search">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Qidiruv"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {filteredChats.map((value) => (
                    <div
                      key={value.guid}
                      onClick={() => changeChat(value.guid)}
                      className={
                        "chat " +
                        String(value.guid === activeChatId ? "active" : "")
                      }
                    >
                      <div className="image">
                        <img
                          src={`${usersApi.split("/api")[0]}${
                            value.display.pfp
                          }`}
                          alt={value.display.first_name}
                        />
                      </div>
                      <div className="text">
                        <h3>
                          {value.display.first_name} {value.display.last_name}
                        </h3>
                        <p>{value.display.purposes}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="messages">
                  {activeChatId !== -1 && activeChat ? (
                    <>
                      <div className="user">
                        <div className="content">
                          <div className="image">
                            <img
                              src={`${usersApi.split("/api")[0]}${
                                activeChat.display.pfp
                              }`}
                              alt="..."
                            />
                          </div>
                          <div className="text">
                            <h3>
                              {activeChat.display.first_name}{" "}
                              {activeChat.display.last_name}
                            </h3>
                            <p>{activeChat.display.purposes}</p>
                          </div>
                        </div>
                      </div>

                      <div className="messages-container" ref={messagesDiv}>
                        <div className="plain-messages">
                          {chatHistory.map((value, index) => {
                            const messageDate = new Date(
                              value.created_at
                            ).toLocaleDateString();
                            const showDateHeader = lastDate !== messageDate;
                            lastDate = messageDate;

                            return value.type === "product" ? (
                              <ProductMessage
                                message={value}
                                key={value.guid}
                              />
                            ) : (
                              <React.Fragment key={value.guid}>
                                {showDateHeader && (
                                  <div className="date-separator">
                                    <span>{messageDate}</span>
                                  </div>
                                )}
                                <div
                                  className={
                                    "message " +
                                    (value.user === guid ? "out" : "in")
                                  }
                                >
                                  <p className="content">{value.content}</p>
                                  {value.user !==
                                    chatHistory[index + 1]?.user && (
                                    <span className="date">
                                      {convertTimestamp(value.created_at)}
                                    </span>
                                  )}
                                </div>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>

                      <form action="" onSubmit={handleSubmit}>
                        <div className="message-form">
                          <input
                            type="text"
                            className="message-input"
                            placeholder="Matn"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                          />
                          <button className="message-send" type="submit">
                            <img src={Send} alt="..." />
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <div className="no-chat-selected">
                        <p className="message">
                          Xabarlarning ko'rish uchun suhbat tanlang
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : loading ? (
            <Loading />
          ) : (
            <>
              <div className="chats-not-found">
                <div className="content">
                  <img src={NoChats} className="chats-not-found-icon" />
                  <div className="text">
                    <h2 className="title">Xabarlar yo’q</h2>
                    <p className="text">Bu yerda xabarlar bo’ladi</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Messaging;
