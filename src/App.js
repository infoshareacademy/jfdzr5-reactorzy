import SignInSide from "./Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInSide />} />
      </Routes>
    </>
  );
}

export default App;
