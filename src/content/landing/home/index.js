import React from "react";
import { CreatePostInput } from "../../posts/CreatePostInput";
import PostList from "../../posts/index";

const MainView = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CreatePostInput />
      <PostList />
    </div>
  );
};

export default MainView;
