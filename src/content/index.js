import SignInSide from "./signin";
import { Routes, Route } from "react-router-dom";
import SignUp from "./signup";

export const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInSide />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};
