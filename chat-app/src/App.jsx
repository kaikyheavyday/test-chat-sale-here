import { useState, useEffect } from "react";

import { socket } from "./libs/socket";

import Logo from "./assets/images/logo.png";
function App() {
  const [name, setName] = useState("");
  const handleSubmitName = () => {
    socket.emit("add:user", name);
  };

  return (
    <div className="app">
      <img src={Logo} alt="logo" className="logo" width={150} />
      <div className="container">
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
      </div>
    </div>
  );
}

export default App;
