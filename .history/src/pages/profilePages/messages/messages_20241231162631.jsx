import React, { useRef, useState } from "react";
import "./messages.scss";
import userImg from "../../usersMessaging/user-chat-img.png";
import userImg2 from "../../usersMessaging/user-chat-img-2.png";
import productImg from "../../usersMessaging/product.png";
import Picker from "emoji-picker-react";
import chatsNot from "../../usersMessaging/Frame.png";
const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [fullChatScreen, setFullChatScreen] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [usersChats, setUsersChats] = useState([
    {
      id: 1,
      userImg: userImg,
      userName: "Aziz Karimov",
      userJob: "Temirchi",
      star: true,
      unread: true, // O'qilmagan
    },
    {
      id: 2,
      userImg: userImg2,
      userName: "Dilnoza Karimova",
      userJob: "Tikuvchi",
      star: false,
      unread: false, // O'qilgan
    },
  ]);
  const getCurrentTime = () =>
    new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => ({
        ...prev,
        [activeChat]: [
          ...(prev[activeChat] || []),
          { text: newMessage, sender: "self", time: getCurrentTime() },
        ],
      }));
      setNewMessage("");
    }
  };
  const handleChatScreen = () => {
    setFullChatScreen(!fullChatScreen);
  };
  const handleChatClick = (index) => {
    setUsersChats((prevChats) =>
      prevChats.map((chat, i) =>
        i === index ? { ...chat, unread: false } : chat
      )
    );
    setActiveChat(index); // Aktiv chatni o'zgartiradi
  };
  const countdownInterval = useRef(null);
  const userInfo = () => {
    setShowUserInfo(!showUserInfo);
  };
  const handleDeleteChat = (index) => {
    setSelectedChatIndex(index);
    setShowDeleteModal(true);
    setShowUserInfo(false);
  };
  const confirmDeleteChat = () => {
    setIsDeleting(true);
    let timer = 5;
    countdownInterval.current = setInterval(() => {
      if (timer === 0) {
        clearInterval(countdownInterval.current);
        const updatedChats = [...usersChats];
        updatedChats.splice(selectedChatIndex, 1);
        setUsersChats(updatedChats);
        setShowDeleteModal(false);
        setActiveChat(null);
        setFullChatScreen(false);
        setIsDeleting(false);
        setCountdown(5);
      } else {
        setCountdown(timer);
        timer--;
      }
    }, 1000);
  };
  const cancelDelete = () => {
    clearInterval(countdownInterval.current);
    setShowDeleteModal(false);
    setCountdown(5);
    setIsDeleting(false);
  };
  const closeDeleteModal = () => {
    clearInterval(countdownInterval.current);
    setShowDeleteModal(false);
    setCountdown(5);
  };
  return (
    <div>
      {usersChats.length > 0 ? (
        <div id="chatbox-prof">
          <div className={`chat-left ${fullChatScreen ? "small-width" : ""}`}>
            <form action="" id="search-form">
              <input type="text" placeholder="Qidiruv" required />
              <button disabled>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.9284 17.04L20.4016 20.4M19.2816 11.44C19.2816 15.7699 15.7715 19.28 11.4416 19.28C7.11165 19.28 3.60156 15.7699 3.60156 11.44C3.60156 7.11006 7.11165 3.59998 11.4416 3.59998C15.7715 3.59998 19.2816 7.11006 19.2816 11.44Z"
                    stroke="#B2B2B2"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </form>
            <ul id="user-chats-list">
              {usersChats.map((chat, index) => (
                <li
                  key={index}
                  className={activeChat === index ? "active" : ""}
                  onClick={() => handleChatClick(index)} // Chat ustiga bosilganda ishlaydi
                >
                  <div className="user">
                    <img src={chat.userImg} alt="" />
                    <div className="about-user">
                      <div className="name">{chat.userName}</div>
                      <div className="job">{chat.userJob}</div>
                    </div>
                  </div>
                  <div className="star">
                    {chat.unread ? (
                      <span id="gold">&#9733;</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={`chat-right ${fullChatScreen ? "active" : ""}`}>
            {activeChat !== null ? (
              <>
                <div className="top">
                  <div className="top-left">
                    <button
                      id="btn1"
                      className={`${fullChatScreen ? "btn-active" : ""}`}
                      onClick={handleChatScreen}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_904_27304)">
                          <path
                            d="M19.1667 9.16669H0.833333C0.373096 9.16669 0 9.53978 0 10C0 10.4603 0.373096 10.8334 0.833333 10.8334H19.1667C19.6269 10.8334 20 10.4603 20 10C20 9.53978 19.6269 9.16669 19.1667 9.16669Z"
                            fill="#5A5A5A"
                          />
                          <path
                            d="M19.1667 3.33331H0.833333C0.373096 3.33331 0 3.70641 0 4.16665C0 4.62688 0.373096 4.99998 0.833333 4.99998H19.1667C19.6269 4.99998 20 4.62688 20 4.16665C20 3.70641 19.6269 3.33331 19.1667 3.33331Z"
                            fill="#5A5A5A"
                          />
                          <path
                            d="M19.1667 15H0.833333C0.373096 15 0 15.3731 0 15.8333C0 16.2936 0.373096 16.6667 0.833333 16.6667H19.1667C19.6269 16.6667 20 16.2936 20 15.8333C20 15.3731 19.6269 15 19.1667 15Z"
                            fill="#5A5A5A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_904_27304">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <div className="currentUser">
                      <img src={usersChats[activeChat]?.userImg} alt="" />
                      <div className="about-user">
                        <div className="name">
                          {usersChats[activeChat]?.userName}
                        </div>
                        <div className="job">
                          {usersChats[activeChat]?.userJob}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`three-dot ${showUserInfo ? "active" : ""}`}
                    onClick={userInfo}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_904_27290)">
                        <path
                          d="M9.9987 3.33333C10.9192 3.33333 11.6654 2.58714 11.6654 1.66667C11.6654 0.746192 10.9192 0 9.9987 0C9.07822 0 8.33203 0.746192 8.33203 1.66667C8.33203 2.58714 9.07822 3.33333 9.9987 3.33333Z"
                          fill="#5A5A5A"
                        />
                        <path
                          d="M9.9987 11.6666C10.9192 11.6666 11.6654 10.9205 11.6654 9.99998C11.6654 9.07951 10.9192 8.33331 9.9987 8.33331C9.07822 8.33331 8.33203 9.07951 8.33203 9.99998C8.33203 10.9205 9.07822 11.6666 9.9987 11.6666Z"
                          fill="#5A5A5A"
                        />
                        <path
                          d="M9.9987 20C10.9192 20 11.6654 19.2538 11.6654 18.3334C11.6654 17.4129 10.9192 16.6667 9.9987 16.6667C9.07822 16.6667 8.33203 17.4129 8.33203 18.3334C8.33203 19.2538 9.07822 20 9.9987 20Z"
                          fill="#5A5A5A"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_904_27290">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  {showUserInfo && (
                    <ul className="user-info">
                      <li>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.5 16.5002C3.78696 16.1788 5.71487 14.6647 6.67313 13.9183C7.02213 13.6464 7.45023 13.5002 7.89262 13.5002C8.96233 13.5002 11.0237 13.5002 12.0985 13.5002C12.5461 13.5002 12.9785 13.6526 13.3388 13.9181C14.5761 14.8296 15.7361 15.5088 17 16.5002M5 18H15C16.6569 18 18 16.6569 18 15V5C18 3.34315 16.6569 2 15 2H5C3.34315 2 2 3.34315 2 5V15C2 16.6569 3.34315 18 5 18ZM12.8655 7.7267C12.8655 6.20044 11.577 4.9534 10 4.9534C8.42302 4.9534 7.13454 6.20044 7.13454 7.7267C7.13454 9.25296 8.42302 10.5 10 10.5C11.577 10.5 12.8655 9.25296 12.8655 7.7267Z"
                            stroke="#41A58D"
                            stroke-width="1.5"
                          />
                        </svg>
                        Kontakt tafsilotlari
                      </li>
                      <li>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1219_22434)">
                            <path
                              d="M8.8987 11.0916C9.74441 11.9381 10.7002 12.6669 11.7404 13.2583L12.7987 12.2C13.0253 11.9759 13.3113 11.8215 13.623 11.7551C13.9346 11.6886 14.2588 11.7129 14.557 11.825C15.3131 12.1071 16.0986 12.3028 16.8987 12.4083C17.2992 12.4649 17.6654 12.6652 17.9291 12.9718C18.1928 13.2785 18.336 13.6706 18.332 14.075V16.575C18.333 16.8071 18.2854 17.0368 18.1925 17.2494C18.0995 17.4621 17.9631 17.653 17.7921 17.8099C17.6211 17.9668 17.4192 18.0862 17.1993 18.1606C16.9795 18.2349 16.7465 18.2625 16.5154 18.2416C13.9511 17.963 11.4879 17.0868 9.3237 15.6833C8.31976 15.0459 7.38914 14.2997 6.5487 13.4583M4.3237 10.675C2.92024 8.51081 2.044 6.04762 1.76536 3.48331C1.74454 3.25287 1.77193 3.02061 1.84578 2.80133C1.91964 2.58205 2.03834 2.38055 2.19434 2.20966C2.35033 2.03877 2.5402 1.90224 2.75186 1.80875C2.96351 1.71526 3.19231 1.66686 3.4237 1.66665H5.9237C6.32812 1.66267 6.72019 1.80588 7.02683 2.06959C7.33347 2.3333 7.53376 2.69952 7.59036 3.09998C7.69588 3.90003 7.89157 4.68559 8.1737 5.44165C8.28582 5.73992 8.31008 6.06407 8.24362 6.37571C8.17716 6.68735 8.02275 6.97341 7.7987 7.19998L6.74036 8.25831M19.1654 0.833313L0.832031 19.1666"
                              stroke="#5A5A5A"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1219_22434">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Ovozsiz
                      </li>
                      <li
                        onClick={() =>
                          handleDeleteChat(usersChats[activeChat].index)
                        }
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 5.00002H4.16667M4.16667 5.00002H17.5M4.16667 5.00002V16.6667C4.16667 17.1087 4.34226 17.5326 4.65482 17.8452C4.96738 18.1578 5.39131 18.3334 5.83333 18.3334H14.1667C14.6087 18.3334 15.0326 18.1578 15.3452 17.8452C15.6577 17.5326 15.8333 17.1087 15.8333 16.6667V5.00002M6.66667 5.00002V3.33335C6.66667 2.89133 6.84226 2.4674 7.15482 2.15484C7.46738 1.84228 7.89131 1.66669 8.33333 1.66669H11.6667C12.1087 1.66669 12.5326 1.84228 12.8452 2.15484C13.1577 2.4674 13.3333 2.89133 13.3333 3.33335V5.00002M8.33333 9.16669V14.1667M11.6667 9.16669V14.1667"
                            stroke="#5A5A5A"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        O'chirish
                      </li>
                    </ul>
                  )}

                  {showDeleteModal && !isDeleting && (
                    <>
                      <div className="black-window"></div>
                      <div className="modal-overlay">
                        <div className="modal-content">
                          <h3>Chatni o'chirishni tasdiqlaysizmi?</h3>
                          <div className="modal-buttons">
                            <button id="no" onClick={closeDeleteModal}>
                              Bekor qilish
                            </button>
                            <button id="yes" onClick={confirmDeleteChat}>
                              Ha, o'chirish
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {isDeleting && (
                    <>
                      <div className="black-window"></div>
                      <div className="delete-modal">
                        <div className="modal-content">
                          <h3>{countdown} soniyada o'chiriladi...</h3>
                          <button onClick={cancelDelete}>Cancel</button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="middle">
                  <div className="replied-product">
                    <img src={productImg} alt="" />
                    <span>Chust hunarmand pichoqlari</span>
                  </div>
                  <div className="messages">
                    {messages[activeChat]?.map((msg, i) => (
                      <div
                        key={i}
                        className={`message ${
                          msg.sender === "self" ? "sent" : "received"
                        }`}
                      >
                        <div
                          className={`text ${
                            msg.sender === "self" ? "sent" : "received"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div className="time">{msg.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="send-message">
                  <div className="input-row">
                    <input
                      type="text"
                      placeholder="Xabar yozing..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <button
                      type="button"
                      id="emoji-btn"
                      onClick={() => setShowPicker(!showPicker)}
                      className={`emoji-btn-class ${
                        showPicker ? "active" : ""
                      }`}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.11844 8.11999V7.11999C7.56615 7.11999 7.11844 7.56771 7.11844 8.11999H8.11844ZM8.21406 8.11999H9.21406C9.21406 7.56771 8.76635 7.11999 8.21406 7.11999V8.11999ZM13.8784 8.11999V7.11999C13.3262 7.11999 12.8784 7.56771 12.8784 8.11999H13.8784ZM13.9634 8.11999H14.9634C14.9634 7.56771 14.5157 7.11999 13.9634 7.11999V8.11999ZM8.21406 8.19687V9.19687C8.76635 9.19687 9.21406 8.74915 9.21406 8.19687H8.21406ZM8.11844 8.19687H7.11844C7.11844 8.74915 7.56615 9.19687 8.11844 9.19687V8.19687ZM13.9634 8.19687V9.19687C14.5157 9.19687 14.9634 8.74915 14.9634 8.19687H13.9634ZM13.8784 8.19687H12.8784C12.8784 8.74915 13.3262 9.19687 13.8784 9.19687V8.19687ZM8.52067 13.3928C8.22999 12.9232 7.61366 12.7782 7.14406 13.0689C6.67446 13.3596 6.52942 13.9759 6.82011 14.4455L8.52067 13.3928ZM15.1768 14.4455C15.4674 13.9759 15.3224 13.3596 14.8528 13.0689C14.3832 12.7782 13.7669 12.9232 13.4762 13.3928L15.1768 14.4455ZM19.5984 11C19.5984 15.7496 15.7481 19.6 10.9984 19.6V21.6C16.8527 21.6 21.5984 16.8542 21.5984 11H19.5984ZM10.9984 19.6C6.24879 19.6 2.39844 15.7496 2.39844 11H0.398438C0.398438 16.8542 5.14422 21.6 10.9984 21.6V19.6ZM2.39844 11C2.39844 6.25034 6.24879 2.39999 10.9984 2.39999V0.399994C5.14422 0.399994 0.398438 5.14577 0.398438 11H2.39844ZM10.9984 2.39999C15.7481 2.39999 19.5984 6.25034 19.5984 11H21.5984C21.5984 5.14577 16.8527 0.399994 10.9984 0.399994V2.39999ZM8.11844 9.11999H8.21406V7.11999H8.11844V9.11999ZM13.8784 9.11999H13.9634V7.11999H13.8784V9.11999ZM7.21406 8.11999V8.19687H9.21406V8.11999H7.21406ZM8.21406 7.19687H8.11844V9.19687H8.21406V7.19687ZM9.11844 8.19687V8.11999H7.11844V8.19687H9.11844ZM12.9634 8.11999V8.19687H14.9634V8.11999H12.9634ZM13.9634 7.19687H13.8784V9.19687H13.9634V7.19687ZM14.8784 8.19687V8.11999H12.8784V8.19687H14.8784ZM10.9984 14.7999C9.96866 14.7999 9.0508 14.2492 8.52067 13.3928L6.82011 14.4455C7.68986 15.8506 9.22991 16.7999 10.9984 16.7999V14.7999ZM13.4762 13.3928C12.9461 14.2492 12.0282 14.7999 10.9984 14.7999V16.7999C12.767 16.7999 14.307 15.8506 15.1768 14.4455L13.4762 13.3928Z"
                          fill="#B2B2B2"
                        />
                      </svg>
                    </button>
                  </div>
                  <button id="send-btn" onClick={handleSendMessage}>
                    <svg
                      width="34"
                      height="32"
                      viewBox="0 0 34 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M32.0836 16L15.231 16M8.12934 21.5591H4.88359M8.12934 16.1953H1.68359M8.12934 10.8314H4.88359M13.8268 6.12798L31.5005 14.6971C32.5889 15.2248 32.5889 16.7753 31.5006 17.303L13.8268 25.8721C12.616 26.4591 11.3291 25.2215 11.8684 23.9887L15.1095 16.5804C15.2714 16.2104 15.2714 15.7896 15.1095 15.4196L11.8684 8.01134C11.3291 6.77857 12.616 5.54094 13.8268 6.12798Z"
                        stroke="#B2B2B2"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                  {showPicker && (
                    <Picker
                      id="emojies"
                      onEmojiClick={(emojiObject) =>
                        setNewMessage((prevMsg) => prevMsg + emojiObject.emoji)
                      }
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="user-not-choose">Chat tanlanmagan</div>
            )}
          </div>
        </div>
      ) : (
        <div id="chats-notfound">
          <img src={chatsNot} alt="" />
          <h2>Xabarlar yo'q</h2>
        </div>
      )}
    </div>
  );
};

export default Messages;
