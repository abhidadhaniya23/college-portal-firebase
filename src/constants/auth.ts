import { createUserWithEmailAndPassword } from "../utils/authFunctions";
import { paths } from "./paths";

export const authPagesData = {
  signIn: {
    title: "Sign In",
    subTitle: "Enter your details to continue",
    switchPageText: "Don't have an account?",
    link: paths.signUp,
    tabs: [
      {
        label: "Student",
        value: "student",
        loginFn: () => console.log("student"),
      },
      {
        label: "Teacher",
        value: "teacher",
        loginFn: () => console.log("teacher"),
      },
    ],
  },
  signUp: {
    title: "Sign Up",
    subTitle: "Enter your details to register",
    switchPageText: "Already have an account?",
    link: paths.signIn,
    tabs: [
      {
        label: "Student",
        value: "student",
        loginFn: (email: string, password: string) => {
          console.log("student");
          createUserWithEmailAndPassword({ email, password });
        },
      },
      {
        label: "Teacher",
        value: "teacher",
        loginFn: (email: string, password: string) => console.log("teacher"),
      },
    ],
  },
};
