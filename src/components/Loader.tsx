import { Spinner } from "@material-tailwind/react";

const Loader = () => {
  return (
    <>
      <div className="w-full mx-auto flex justify-center">
        <Spinner />
      </div>
    </>
  );
};

export default Loader;
