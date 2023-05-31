import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";


const SignIn = () => {


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


    return (
        <>
            {/* signUp Details */}
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray" className="mt-8">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                <Typography className="flex flex-col mx-auto">
                    {/* tabs */}
                    <Tabs value="html" className="mt-7">
                        <TabsHeader className="w-96">
                            {data.map(({ label, value }) => (
                                <Tab key={value} value={value} className="w-96">
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <Input size="lg" label="Name" />
                            <Input size="lg" label="Email" />
                            <Input type="password" size="lg" label="Password" />
                        </div>
                        <Checkbox
                            label={
                                <Typography variant="small" color="gray" className="flex items-center font-normal">
                                    I agree the
                                    <a href="#" className="font-medium transition-colors hover:text-blue-500">
                                        &nbsp;Terms and Conditions
                                    </a>
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5" }}
                        />
                        <Button className="mt-6" fullWidth>
                            Register
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <a href="#" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
                                Sign In
                            </a>
                        </Typography>
                    </form>
                </Typography>
            </Card>{" "}
        </>
    );
};

export default SignIn;
