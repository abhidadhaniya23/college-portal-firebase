import { BrowserRouter, Route, Routes } from "react-router-dom";
import { paths } from "./constants/paths";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: "Inter Tight",
          },
        }}
      />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={paths.home.path} element={<Home />} />
            <Route path={paths.signIn.path} element={<SignIn />} />
            <Route path={paths.signUp.path} element={<SignUp />} />
            <Route path={paths.profile.path} element={<Profile />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
