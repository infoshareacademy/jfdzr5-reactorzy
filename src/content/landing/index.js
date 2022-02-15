import React, { useEffect, useState } from "react";
import { useUserContext } from "../../services/user-context";
import MainView from "./home";
import SignInSide from "./signin/dashboard";
import Loading from "../../common/loading";

export const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? <Loading /> : user ? <MainView /> : <SignInSide />;
};
