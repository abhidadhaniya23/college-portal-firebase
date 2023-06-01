import { useEffect } from "react";
import AuthState from "../hooks/AuthState";
import { useNavigate } from "react-router-dom";
import { paths } from "../constants/paths";
import { toast } from "react-hot-toast";
import { Avatar, Input, Typography } from "@material-tailwind/react";
import { userAvatar } from "../constants/constant";
import CurrentUser from "../hooks/CurrentUser";
import Loader from "../components/Loader";
import { useQuery } from "react-query";

const Profile = () => {
  const navigate = useNavigate();
  const [user, loading] = AuthState();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please sign in to view your profile.");
      navigate(paths.signIn.path);
    }
  }, [user]);

  const { data, isLoading } = useQuery("user", CurrentUser, {
    enabled: !!user,
  });

  if (loading || isLoading) return <Loader />;

  return (
    <>
      <div className="flex flex-col mx-auto items-center gap-3 mt-7 w-11/12 lg:w-96">
        <Avatar
          src={userAvatar}
          draggable={false}
          className="border border-solid border-gray-400"
          referrerPolicy="no-referrer"
          alt="avatar"
          size="xxl"
          variant="circular"
        />
        <Typography variant="h2">{data?.name}</Typography>
        <hr className="bg-gray-800/80 w-full mx-auto" />
        <div className="my-5 flex flex-col gap-5 w-full">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="email">Email</label>
            <Input disabled value={data?.email} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
