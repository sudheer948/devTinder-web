import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });

    console.log(chatMessages);

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection(); // now i can use this socket to emit events
    // As soon as the page loads, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((message) => [...message, { firstName, lastName, text }]);
    });

    /*
    
Why inside?
1. The effect creates the socket connection.
2. It joins the chat room.
3. It registers the message listener on that socket.
4. When the component unmounts or dependencies change, it disconnects that socket.
If you put the listener outside the effect, you could accidentally register multiple listeners during React renders.

    */

    // whenever this component unloads, you do cleanup of this event also. otherwise you would have loose socket connections - imp
    return () => {
      socket.disconnect();
    }; // this return function is called when the component unmounts
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection(); // we write this bcz we cannot reuse the socket that is inside useeffect
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="p-11">
      <div className="mt-22 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
        <h1 className="p-5 border-b border-gray-600">Chat</h1>
        <div className="flex-1 overflow-scroll p-5">
          {messages.map((msg, index) => {
            return (
              <div key={index}>
                <div
                  className={
                    "chat" +
                    (user.firstName === msg.firstName ? " chat-end" : "chat-start")
                  }
                >
                  <div className="chat-header">
                    {`${msg.firstName} ${msg.lastName}`}
                    <time className="text-xs opacity-50">2 hours ago</time>
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                  <div className="chat-footer opacity-50">Seen</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-5 border-t border-gray-600 flex items-center gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-500 text-black rounded p-2"
          />
          <button onClick={sendMessage} className="btn btn-secondary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
