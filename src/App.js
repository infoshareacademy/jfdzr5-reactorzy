import SignInSide from "./Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Dashboard/signup-logikaFirebase";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
