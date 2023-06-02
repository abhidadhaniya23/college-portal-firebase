export const paths: {
  [key: string]: { path: string; label: string; public: boolean | null };
} = {
  home: {
    path: "/",
    label: "Home",
    public: null,
  },
  signIn: {
    path: "/sign-in",
    label: "Sign In",
    public: true,
  },
  signUp: {
    path: "/sign-up",
    label: "Sign Up",
    public: true,
  },
  profile: {
    path: "/dashboard",
    label: "Dashboard",
    public: false,
  },
};

export const links = Object.keys(paths).map((key) => ({
  ...paths[key],
  key,
}));
