import { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../index";
// import {getDownloadURL, getStorage, ref} from "firebase/storage";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usersId, setUsersId] = useState([]);
  // Kamil
  const [detailsUser, setDetailsUser] = useState({
    name: "",
    technologies: "",
    about: "",
    avatar: "",
    userID: "",
    momentaryAvatar: ''
  });
  // const [avatarUrl, setAvatarUrl] = useState(null);

  // Kamil
  const getDataFromFirebase = async (usero) => {
    const docRef = await doc(db, "userDetails", usero);
    const docSnap = await getDoc(docRef);
    setDetailsUser({
      name: docSnap.data().name ? docSnap.data().name : "",
      technologies: docSnap.data().technologies
        ? docSnap.data().technologies
        : "",
      about: docSnap.data().about ? docSnap.data().about : "",
      avatar: docSnap.data().avatar ? docSnap.data().avatar : "",
      userID: usero,
      momentaryAvatar: ''
    });
  };

  const getUserIdList = async () => {
    const docRef = await doc(db, "users", "IdList");
    const docSnap = await getDoc(docRef);
    setUsersId(docSnap.data().IdList);
  };

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (userData) => {
      setUser(userData);
      setIsLoading(false);
      // Kamil
      if (userData) {
        getDataFromFirebase(userData.uid);
      }
      getUserIdList();
      // if (userData) {
      //     const storage = getStorage();
      //     // const storageRef = ref(storage, `avatars/${userData.uid}`);
      //     getDownloadURL(storageRef).then((url) => {
      //         setAvatarUrl(url);
      //     }).catch(err => {
      //         setAvatarUrl(null);
      //     });
      // }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        usersId,
        detailsUser,
        setDetailsUser,
        // avatarUrl,
        // setAvatarUrl
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
