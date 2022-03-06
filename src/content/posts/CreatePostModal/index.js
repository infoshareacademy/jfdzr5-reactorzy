import React, { useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useUserContext } from "../../../services/user-context";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import TextPost from "./TextPost";
import ImagePost from "./ImagePost";

export const CreatePostModal = ({ open, setOpen }) => {
  const { user } = useUserContext();
  const db = getFirestore();
  const storage = getStorage();
  const [imageData, setImageData] = useState(null);
  const [image, setImage] = useState(null);
  const [titleData, setTitleData] = useState("");
  const [contentData, setContentData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const content = formData.get("content");

    const postRef = await addDoc(collection(db, "posts"), {
      comments: [],
      content: content,
      likes: [],
      picture: null,
      technologies: [],
      timestamp: date,
      title: title,
      userID: user.uid,
      displayName: user.displayName,
    });
    setOpen(false);

    const updatePostCount = async () => {
      let posts = 0;

      const postsRef = doc(db, "users", "postsMade");

      const postsSnap = await getDoc(postsRef);
      if (postsSnap.exists()) {
        posts = postsSnap.data().posts;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      await updateDoc(postRef, {
        posts: posts++,
      });
    };

    updatePostCount();

    if (image) {
      const pictureUploadRef = ref(storage, `posts/${postRef.id}`);
      uploadBytes(pictureUploadRef, image);
      updateDoc(postRef, {
        picture: pictureUploadRef.fullPath,
      });
      setOpen(false);
    }
  };

  return imageData ? (
    <div>
      <ImagePost
        open={open}
        setOpen={setOpen}
        setImageData={setImageData}
        handleSubmit={handleSubmit}
        setImage={setImage}
        imageData={imageData}
        contentData={contentData}
        setContentData={setContentData}
        titleData={titleData}
        setTitleData={setTitleData}
      />
    </div>
  ) : (
    <div>
      <TextPost
        open={open}
        setOpen={setOpen}
        setImage={setImage}
        handleSubmit={handleSubmit}
        imageData={imageData}
        setImageData={setImageData}
        contentData={contentData}
        setContentData={setContentData}
        titleData={titleData}
        setTitleData={setTitleData}
      />
    </div>
  );
};
