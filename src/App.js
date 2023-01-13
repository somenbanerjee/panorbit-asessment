import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./controllers/Home";
import User from "./controllers/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      {<Route path="/user/:id" element={<User />}></Route>}
    </Routes>
  );
}

export default App;
