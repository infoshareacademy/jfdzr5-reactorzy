import { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import {getDownloadURL, getStorage, ref} from "firebase/storage";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (userData) => {
      setUser(userData);
      setIsLoading(false);

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
        // avatarUrl,
        // setAvatarUrl
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
