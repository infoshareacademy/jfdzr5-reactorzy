import { Routes, Route } from "react-router-dom";
import SignUp from "./landing/signin/signup";
import { Landing } from "./landing";

export const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};
