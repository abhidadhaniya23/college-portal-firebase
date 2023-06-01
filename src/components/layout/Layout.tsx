import Navbar from "../Navbar";
import SafeArea from "../SafeArea";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <div className="flex justify-center">
        <Navbar />
      </div>
      <SafeArea>
        <main className="pb-10">{children}</main>
      </SafeArea>
    </>
  );
};

export default Layout;
