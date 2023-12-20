import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "./../libs/socket";
import { setProfile } from "./../store/reducers";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const [name, setName] = useState("");

  const handleSubmitName = () => {
    socket.emit("add:user", name);
  };
  useEffect(() => {
    socket.on("get:user", (data) => {
      dispatch(setProfile(data));
    });
  }, []);

  useEffect(() => {
    console.log(profile);
  }, [profile]);
  return (
    <>
      {!profile.id ? (
        <div className="form-name">
          <h2 className="title">ชื่อของคุณ</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {name && <button onClick={handleSubmitName}>ยืนยัน</button>}
        </div>
      ) : (
        <div className="form-name">
          <h2 className="title">คุณ {profile.name}</h2>
          <button
            onClick={() => {
              navigate("/add-room");
            }}
          >
            สร้างห้องใหม่
          </button>
          <button
            className="text"
            onClick={() => {
              navigate("/find-room");
            }}
          >
            เข้าร่วมแชท
          </button>
        </div>
      )}
    </>
  );
}
