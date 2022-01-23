import SignInSide from "../Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import SignUp from "../Dashboard/signup";

export const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInSide />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};
