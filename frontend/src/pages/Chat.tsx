import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import "../components/Styles/Chat.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (!content.trim()) return;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!auth?.user) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [auth]);

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="chat-sidebar-box">
          <div className="avatar">
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </div>
          <p>You are talking to a ChatBOT</p>
          <p className="sidebar-desc">
            You can ask some questions related to Knowledge, Business, Advices, Education, etc. But avoid sharing personal information
          </p>
          <button onClick={handleDeleteChats} className="clear-button">
            Clear Conversation
          </button>
        </div>
      </div>

      <div className="chat-main">
        <h1 className="chat-title">Model - OLLAMA Llama 3.2</h1>
        <div className="chat-messages">
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </div>
        <div className="chat-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <button className="send-button" onClick={handleSubmit}>
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
