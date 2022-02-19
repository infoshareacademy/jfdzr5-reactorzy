import { Routes, Route } from "react-router-dom";
import SignUp from "./landing/signin/signup";
import { Landing } from "./landing";
import { UserProfile } from "./userView";

export const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="user" element={<UserProfile />} />
    </Routes>
  );
};
