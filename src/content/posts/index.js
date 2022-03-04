import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import Post from "./Post";
import Loading from "../../common/loading";

const PostList = () => {
  const db = getFirestore();
  const [isLoading, setIsLoading] = useState(true);
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    let posts = [];
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const fetchPosts = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => posts.push([doc.id, doc.data()]));
      setIsLoading(false);
      setPostsList(posts);
    };
    fetchPosts();
  }, [db]);
  return isLoading ? (
    <Loading />
  ) : (
    postsList.map((item) => (
      <Post
        key={item[0]}
        postID={item[0]}
        comments={item[1].comments}
        content={item[1].content}
        likes={item[1].likes}
        picture={item[1].picture}
        technologies={item[1].technologies}
        timestamp={item[1].timestamp}
        title={item[1].title}
        userID={item[1].userID}
      />
    ))
  );
};

export default PostList;
