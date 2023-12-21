import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../libs/socket";
export default function FindRoom() {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");

  const handleSubmitRoom = () => {
    socket.emit("find:room", room);
    socket.on("find:room", (data) => {
      if (data !== "") {
        navigate(`/room/${data}`);
      } else {
        alert("ไม่มีห้องนี้");
      }
    });
  };
  return (
    <div className="form-name">
      <h2 className="title">เข้าร่วมแชท</h2>
      <input
        type="text"
        value={room}
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <div className="button-group">
        <button
          className="text"
          onClick={() => {
            navigate("/");
          }}
        >
          กลับ
        </button>
        <button onClick={handleSubmitRoom}>เข้าร่วม</button>
      </div>
    </div>
  );
}
