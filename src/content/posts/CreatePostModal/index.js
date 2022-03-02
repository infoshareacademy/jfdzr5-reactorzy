import React, { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useUserContext } from "../../../services/user-context";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import TextPost from "./TextPost";
import ImagePost from "./ImagePost";

export const CreatePostModal = ({ open, setOpen }) => {
  const { user } = useUserContext();
  const db = getFirestore();
  const storage = getStorage();
  const [imageData, setImageData] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = (img) => {
        setImageData(img.target.result);
        setTimeout(() => console.log(imageData), 10000);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const pictureUploadRef = ref(storage, "posts/");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);
    const title = formData.get("title");
    const content = formData.get("content");

    const postRef = await addDoc(collection(db, "posts"), {
      comments: [],
      content: content,
      likes: [],
      picture: imageData,
      technologies: [],
      timestamp: new Date(),
      title: title,
      userAvatar: "avatarUrl",
      userID: user.id,
    });
  };
  return imageData ? (
    <div>
      <ImagePost
        open={open}
        setOpen={setOpen}
        setImageData={setImageData}
        handleSubmit={handleSubmit}
        imageData={imageData}
      />
    </div>
  ) : (
    <div>
      <div style={{ width: "100px", height: "100px" }}></div>
      <TextPost
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        imageData={imageData}
        setImageData={setImageData}
      />
    </div>
  );
};
