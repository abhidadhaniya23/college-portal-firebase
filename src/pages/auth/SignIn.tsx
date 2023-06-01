import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../constants/paths";
import { auth } from "../../firebase/config";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { Loading } from "../../hooks/AuthState";
import Loader from "../../components/Loader";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await signInWithEmailAndPassword(data.email, data.password)
        .then(() => {
          toast.success("Signed in successfully.");
          navigate(paths.home.path);
        })
        .catch((error) => {
          toast.error("Error signing in.");
          console.error("Error signing in:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const loading = Loading();

  useEffect(() => {
    if (!loading && auth.currentUser) {
      toast.success("You are already signed in.");
      navigate(paths.home.path);
    }
  }, [auth.currentUser]);

  if (loading) return <Loader />;
  return (
    <>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="mt-8">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Fill up below details to sign in.
        </Typography>

        <form
          className="mt-7 flex flex-col mx-auto w-full sm:w-3/4 lg:w-1/3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="py-5 px-0">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-6">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <Input
                      error={errors.email ? true : false}
                      size="lg"
                      label="Email"
                      {...field}
                    />
                  )}
                />
                <Typography
                  color="red"
                  className="-mt-4 text-left text-sm font-normal"
                >
                  {errors.email?.type === "required" && (
                    <span>Email is required</span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span>Enter a valid email</span>
                  )}
                </Typography>

                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: true,
                    minLength: 8,
                  }}
                  render={({ field }) => (
                    <Input
                      error={errors.password ? true : false}
                      type="password"
                      size="lg"
                      {...field}
                      label="Password"
                    />
                  )}
                />
                <Typography
                  color="red"
                  className="-mt-4 text-left text-sm font-normal"
                >
                  {errors.password?.type === "required" && (
                    <span>Password is required</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span>Minimum length of 8 characters</span>
                  )}
                </Typography>
              </div>
              <Button type="submit" className="normal-case text-base" fullWidth>
                {paths.signIn.label}
              </Button>
              <Typography color="gray" className="text-center font-normal">
                Already have an account?{" "}
                <Link
                  to={paths.signIn.path}
                  className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  {paths.signIn.label}
                </Link>
              </Typography>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};

export default SignIn;
