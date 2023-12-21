import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../libs/socket";

export default function AddRoom() {
  const navigate = useNavigate();

  const [room, setRoom] = useState("");

  const handleSubmitRoom = () => {
    if (!room) {
      alert("กรุณาใส่ชื่อห้อง");
    }
    socket.emit("add:room", room);
    socket.on("get:room", (data) => {
      navigate(`/room/${data.roomName}`);
    });
  };
  return (
    <div className="form-name">
      <h2 className="title">สร้างห้องใหม่</h2>
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
        <button onClick={handleSubmitRoom}>ยืนยัน</button>
      </div>
    </div>
  );
}
