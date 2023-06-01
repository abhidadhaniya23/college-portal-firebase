import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthState = () => {
  const [user, loading, error] = useAuthState(auth);
  return [user, loading, error];
};

export const User = () => {
  const [user] = AuthState();
  return user;
};

export const Loading = () => {
  const [, loading] = AuthState();
  return loading;
};

export const signOut = () => {
  auth.signOut();
};

export default AuthState;
