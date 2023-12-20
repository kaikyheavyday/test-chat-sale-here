import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRoom() {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");

  const handleSubmitRoom = () => {
    console.log("test");
    //socket add room and navigate
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
