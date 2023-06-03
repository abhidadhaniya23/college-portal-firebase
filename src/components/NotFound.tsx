import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { paths } from "../constants/paths";

const NotFound = () => {
  return (
    <>
      <Typography color="blueGray" variant="h1" className="text-center mt-20">
        404 Not Found
      </Typography>

      <Button className="mt-10">
        <Link to={paths.home.path}>Back to Home</Link>
      </Button>
    </>
  );
};

export default NotFound;
