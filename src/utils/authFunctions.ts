import { auth } from "../firebase/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

type User = {
  email: string;
  password: string;
};

export const createUserWithEmailAndPassword = ({ email, password }: User) => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  signInWithEmailAndPassword(email, password).then((userCredential) => {
    console.log(userCredential);
    return userCredential;
  });
};
