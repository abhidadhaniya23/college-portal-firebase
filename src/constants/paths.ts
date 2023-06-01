export const paths: { [key: string]: { path: string; label: string } } = {
  home: {
    path: "/",
    label: "Home",
  },
  signIn: {
    path: "/sign-in",
    label: "Sign In",
  },
  signUp: {
    path: "/sign-up",
    label: "Sign Up",
  },
  profile: {
    path: "/profile",
    label: "Profile",
  },
  dashboard: {
    path: "/dashboard",
    label: "Dashboard",
  },
};

export const links = Object.keys(paths).map((key) => ({
  ...paths[key],
  key,
}));
