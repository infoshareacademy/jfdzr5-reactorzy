import SignInSide from "./landing/signin/dashboard";
import { Routes, Route } from "react-router-dom";
import SignUp from "./landing/signin/signup";
import MainView from "./landing/home";
import { useUserContext } from "../services/user-context";

export const Content = () => {
  const { user } = useUserContext();
  return (
    <Routes>
      <Route path="/" element={user ? <MainView /> : <SignInSide />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};
