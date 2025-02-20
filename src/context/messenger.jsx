import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { onlineShopApi } from "../SuperVars";
import { UserContext } from "./user";

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [activeChatId, setActiveChatId] = useState(-1);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatWebSocket, setChatWebSocket] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${onlineShopApi.replace("api", "messenger")}chats/`)
        .then((response) => {
          setChats(
            Array.from(response.data?.chats || []).map((value) => ({
              guid: value.guid,
              display: value.users[0],
            }))
          );
        })
        .catch(() => {
          setChats([]);
        });
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const changeChat = async (guid) => {
    setActiveChatId(guid);
    setActiveChat(chats.find((value) => value.guid === guid));

    const fetchData = async () => {
      const response = await axios.get(
        `${onlineShopApi.replace("api", "messenger")}chats/${guid}/`
      );
      setChatHistory(response.data);
    };

    fetchData();
  };

  useEffect(() => {
    if (activeChat) {
      setChatWebSocket(null);
      const token = window.localStorage.getItem("access");
      const websocket = new WebSocket(
        `ws://localhost:8901/chat/${activeChat.guid}/?token=${token}`
      );

      websocket.onopen = (event) => console.log("Websocket is opened.");

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.message) {
          setChatHistory((prev) => [...prev, data.message]);
        }
      };

      websocket.onclose = (event) => console.log("Websocket is closed.");
      setChatWebSocket(websocket);
    }
  }, [activeChat]);

  const sendMessage = (text) => {
    chatWebSocket.send(
      JSON.stringify({
        function: "send",
        message: { content: text, type: "text" },
      })
    );
  };

  return (
    <>
      <ChatContext.Provider
        value={{
          chats,
          activeChat,
          activeChatId,
          chatHistory,
          loading,
          changeChat,
          sendMessage,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};

export { ChatContext, ChatProvider };
