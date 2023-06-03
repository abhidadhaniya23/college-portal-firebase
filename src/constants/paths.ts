export const paths: {
  [key: string]: { path: string; label: string; public: boolean; subj:boolean | null };
} = {
  home: {
    path: "/",
    label: "Home",
    public: null,
    subj: false,
  },
  signIn: {
    path: "/sign-in",
    label: "Sign In",
    public: true,
    subj: false,
  },
  signUp: {
    path: "/sign-up",
    label: "Sign Up",
    public: true,
    subj : false,
  },
  profile: {
    path: "/dashboard",
    label: "Dashboard",
    public: false,
    subj: false,
  },
  subjects: {
    path: "/subjects",
    label: "Subjects",
    public: false,
    subj: false,
  }
};

export const links = Object.keys(paths).map((key) => ({
  ...paths[key],
  key,
}));
