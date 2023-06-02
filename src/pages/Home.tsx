import { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { paths } from "../constants/paths";
import AuthState from "../hooks/AuthState";

const Home = () => {
  const [user] = AuthState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);
  return (
    <>
      <section className="flex flex-col-reverse gap-20 lg:gap-0 lg:flex-row justify-between items-center py-10">
        <div className="flex flex-col gap-7 text-left lg:w-2/5">
          <Typography
            variant="h1"
            color="blue-gray"
            className="text-3xl lg:text-4xl text-left"
          >
            Discover, learn, and grow with our dynamic platform.
          </Typography>
          <p className="-mt-3 w-3/5">
            Embark on a transformative educational journey as you explore our
            college portal
          </p>
          <div className="flex gap-4">
            <Link to={isAuthenticated ? paths.profile.path : paths.signIn.path}>
              <Button variant="outlined" className="w-fit">
                {isAuthenticated ? "Dashboard" : "Get Started"}
              </Button>
            </Link>
          </div>
        </div>
        <img
          src="https://positiveally.com/wp-content/themes/pa-theme/images/tutor/tutionimages.png"
          alt="hero"
          draggable={false}
          className="lg:w-[50%] w-11/12 h-full object-cover shadow-2xl rounded-xl"
        />
      </section>
    </>
  );
};

export default Home;
