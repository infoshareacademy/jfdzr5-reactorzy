import React from "react";
import { CreatePostInput } from "../../posts/CreatePostInput";
import PostList from "../../posts/index";

const MainView = () => {
  return (
    <div>
      <CreatePostInput />
      <PostList />
    </div>
  );
};

export default MainView;
