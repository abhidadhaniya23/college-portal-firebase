import {
  Card,
  Input,
  Button,
  Typography,
  ListItem,
  List,
  ListItemPrefix,
  Radio,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../constants/paths";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect } from "react";

type Inputs = {
  email: string;
  password: string;
  role: string;
  name: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, , loading] =
    useSignInWithEmailAndPassword(auth);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      role: "student",
    },
  });

  const data = [
    {
      label: "Student",
      value: "student",
    },
    {
      label: "Teacher",
      value: "teacher",
    },
  ];

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          // Create new entry in user collection in firestore.
          setDoc(
            doc(db, "users", data.email),
            {
              email: data.email,
              role: data.role,
              name: data.name,
            },
            { merge: true },
          ).then(() => {
            toast.success("Account created successfully.");

            // Start login session
            signInWithEmailAndPassword(data.email, data.password)
              .then(() => {
                navigate(paths.home.path);
              })
              .catch((error) => {
                toast.error("Error signing in.");
                console.error("Error signing in:", error);
              });
          });
        })
        .catch((error) => {
          toast.error("Email is already in use.");
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading && auth.currentUser) {
      toast.success("You are already signed in.");
      navigate(paths.home.path);
    }
  }, [auth.currentUser]);

  return (
    <>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="mt-8">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register
        </Typography>

        <form
          className="mt-7 flex flex-col mx-auto w-full sm:w-3/4 lg:w-1/3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full max-w-[24rem]">
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <List className="flex-row" {...field}>
                  {data.map(({ label, value }) => (
                    <ListItem className="p-0" key={value}>
                      <label
                        htmlFor="horizontal-list-react"
                        className="px-3 py-2 flex items-center w-full cursor-pointer"
                      >
                        <ListItemPrefix className="mr-3">
                          <Radio
                            value={value}
                            name="horizontal-list"
                            id="horizontal-list-react"
                            defaultChecked={data[0].value === value}
                            defaultValue={data[0].value}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: "p-0",
                            }}
                          />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                          {label}
                        </Typography>
                      </label>
                    </ListItem>
                  ))}
                </List>
              )}
            />
          </div>

          <div className="py-5 px-0">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-6">
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^[a-zA-Z\s]*$/,
                  }}
                  render={({ field }) => (
                    <Input
                      error={errors.name ? true : false}
                      size="lg"
                      label="Name"
                      {...field}
                    />
                  )}
                />
                <Typography
                  color="red"
                  className="-mt-4 text-left text-sm font-normal"
                >
                  {errors.name?.type === "required" && (
                    <span>Name is required</span>
                  )}
                  {errors.name?.type === "pattern" && (
                    <span>Enter a valid name</span>
                  )}
                </Typography>

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
                {paths.signUp.label} as{" "}
                {watch("role").charAt(0).toUpperCase() + watch("role").slice(1)}
              </Button>
              <Typography color="gray" className="text-center font-normal">
                Already have an account?{" "}
                <Link
                  to={paths.signUp.path}
                  className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  {paths.signUp.label}
                </Link>
              </Typography>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};

export default SignUp;
