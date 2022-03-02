import React from "react";
import { CreatePostInput } from "../../posts/CreatePostInput";
import TextPost from "../../posts/Post";

const MainView = () => {
  return (
    <div>
      <CreatePostInput />
      <TextPost />
    </div>
  );
};

export default MainView;
