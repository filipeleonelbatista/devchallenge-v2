import { authentication, db } from "@/services/firebase-config";
import { AuthErrorHandler } from "@/utils/handleFirebaseError";
import { isStringEmpty } from "@/utils/string";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

type UserType = {
  email: string;
  password: string;
};

type SignInResult = {
  user: UserType | undefined;
  status: boolean;
  message: string | undefined;
  error: boolean;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: UserType | null;
  RegisterUser: (userData: {
    email: string;
    password: string;
    user: UserType;
  }) => Promise<boolean>;
  signInUser: (email: string, password: string) => Promise<SignInResult>;
  logout: () => void;
  handleForgotUser: (email: string) => void;
  isLogged: boolean;
  getUserByID: (id: string) => Promise<UserType | null>;
  updateUserByID: (id: string, data: UserType) => Promise<UserType | null>;
  isMenuHide: boolean;
  setIsMenuHide: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);

  const [isLogged, setIsLogged] = useState(false);
  const [isMenuHide, setIsMenuHide] = useState(false);

  // function getKeyLocalStorage(key) {
  //   return localStorage.getItem(key) === null
  //     ? false
  //     : localStorage.getItem(key);
  // }

  function setKeyLocalStorage(key: string, value: string) {
    return localStorage.setItem(key, value);
  }
  function removeKeyLocalStorage(key: string) {
    const hasLocalStorageData = !(localStorage.getItem(key) === null);

    if (hasLocalStorageData) {
      localStorage.removeItem(key);
    }
  }

  async function updateUserByID(
    id: string,
    data: UserType
  ): Promise<UserType | null> {
    try {
      const userData = await getUserByID(id);

      if (userData) {
        const updatedUser = {
          ...userData,
          ...data,
        };

        await setDoc(doc(db, "users", id), updatedUser);

        return updatedUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error("updateUserByID error", error);
      alert(
        `Houve um erro ao atualizar dados do usuário. Tente novamente mais tarde`
      );
      return null;
    }
  }

  function logout() {
    signOut(authentication)
      .then(() => {
        setUser(null);
        setIsLogged(false);
        removeKeyLocalStorage("UID");
        localStorage.clear();
      })
      .catch((error) => {
        alert(`Houve um erro ao tentar sair. Tente novamente mais tarde`);
        console.log("logout error", error);
      });
  }

  function handleForgotUser(email: string) {
    if (isStringEmpty(email)) {
      alert("O campo email não foi preenchido");
      return true;
    }

    sendPasswordResetEmail(authentication, email)
      .then(() => {
        alert("Foi enviado um email com as instruções de recuperação.");
      })
      .catch((err) => {
        console.log("handleForgotUser error", err);
        alert(AuthErrorHandler(err.code));
      });
  }

  async function getUserByID(id: string) {
    const usersRef = doc(db, "users", id);
    const userSnap = await getDoc(usersRef);

    if (userSnap.exists()) {
      const userData = userSnap.data() as DocumentData;
      const user: UserType = {
        email: userData.email || "",
        password: "",
      };
      return user;
    } else {
      return null;
    }
  }

  async function signInUser(
    email: string,
    password: string
  ): Promise<SignInResult> {
    if (isStringEmpty(email)) {
      const status = {
        status: false,
        message: "O campo email não foi preenchido",
        user: undefined,
        error: true,
      };
      return status;
    }
    if (isStringEmpty(password)) {
      const status = {
        user: undefined,
        error: true,
        status: false,
        message: "O campo senha não foi preenchido",
      };
      return status;
    }

    try {
      const re = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      setIsLogged(true);
      setKeyLocalStorage("UID", re.user.uid);
      const currentUser = await getUserByID(re.user.uid);
      setUser(currentUser as UserType);
      const status = {
        user: currentUser as UserType,
        status: true,
        message: undefined,
        error: false,
      };
      return status;
    } catch (err: any) {
      const status = {
        user: undefined,
        status: false,
        message: AuthErrorHandler(err.code),
        error: err,
      };

      console.error("signInUser error", status);
      return status;
    }
  }

  async function RegisterUser({ email, password, user }: any) {
    return createUserWithEmailAndPassword(authentication, email, password)
      .then(async (re) => {
        const newUser = {
          uid: re.user.uid,
          ...user,
        };
        try {
          await setDoc(doc(db, "users", re.user.uid), newUser);

          setKeyLocalStorage("UID", re.user.uid);

          setUser(newUser);
          return true;
        } catch (err) {
          alert(
            "Houve um erro ao cadastrar o usuario. Tente novamente mais tarde"
          );
          return false;
        }
      })
      .catch((err) => {
        alert({
          severity: "error",
          message: AuthErrorHandler(err.code),
        });
        return false;
      });
  }

  useEffect(() => {
    const value = localStorage.getItem("@isMenuHide");
    if (value !== null) {
      setIsMenuHide(JSON.parse(value));
    } else {
      localStorage.setItem("@isMenuHide", "false");
    }
  }, []);

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLogged(true);
        setKeyLocalStorage("UID", user.uid);
        const loggedUser = await getUserByID(user.uid);
        setUser(loggedUser as UserType);
      } else {
        setIsLogged(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        RegisterUser,
        signInUser,
        logout,
        handleForgotUser,
        isLogged,
        getUserByID,
        isMenuHide,
        setIsMenuHide,
        updateUserByID,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
