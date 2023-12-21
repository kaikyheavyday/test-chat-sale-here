import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../libs/socket";
import { useSelector } from "react-redux";

export default function Room() {
  const { roomId } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const profile = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    socket.emit("chat:message", { message: message, roomId });
    socket.on("get:message", (data) => {
      setMessageList(data);
    });
    setMessage("");
    setLoading(false);
  };

  useEffect(() => {
    socket.emit("get:message", roomId);
    socket.on("get:message", (data) => {
      setMessageList(data);
    });
  }, [roomId]);

  const boxMessageList = useMemo(() => {
    return (
      <div className="room-container">
        {!loading &&
          messageList.map((message, index) => {
            return (
              <div
                key={index}
                className="box-message"
                style={{
                  alignItems: message.userId !== profile.id ? "start" : "end",
                }}
              >
                <div className="message-user">คุณ {message.userName}</div>
                <div className="message-box">{message.text}</div>
              </div>
            );
          })}
      </div>
    );
  }, [messageList]);

  return (
    <div className="room">
      <h2 className="title">ห้อง {roomId}</h2>
      <div className="room-box">{boxMessageList}</div>
      <form className="input-box" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Enter เพื่อส่ง"
        />
      </form>
    </div>
  );
}
