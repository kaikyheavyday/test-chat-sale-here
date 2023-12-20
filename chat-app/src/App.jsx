import Logo from "./assets/images/logo.png";
import Home from "./modules/Home";
import Addroom from "./modules/Addroom";
import FindRoom from "./modules/FindRoom";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <img src={Logo} alt="logo" className="logo" width={150} />
      <div className="container">
        <>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="/add-room" element={<Addroom />} />
              <Route path="/find-room" element={<FindRoom />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </>
      </div>
    </div>
  );
}

export default App;
