import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthState = () => {
  const [user, loading, error] = useAuthState(auth);
  return [user, loading, error];
};

export default AuthState;
