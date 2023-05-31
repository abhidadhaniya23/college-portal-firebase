import { BrowserRouter, Route, Routes } from "react-router-dom";
import { paths } from "./constants/paths";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function App() {
  useEffect(() => {
    toast.success("Hello world!");
  }, []);
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
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
