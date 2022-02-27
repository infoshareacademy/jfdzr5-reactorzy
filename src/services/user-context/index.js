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
  // const [avatarUrl, setAvatarUrl] = useState(null);

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
      getUserIdList();
      console.log(usersId);
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
        // avatarUrl,
        // setAvatarUrl
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
