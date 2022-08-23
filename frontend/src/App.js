import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
