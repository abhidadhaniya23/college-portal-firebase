import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { links, paths } from "../constants/paths";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";

export default function NavbarComponent() {
  const [openNav, setOpenNav] = useState(false);

  const navList = (
    <ul className="flex flex-col gap-0 lg:flex-row lg:items-center lg:gap-6">
      {links.map((link, index) => (
        <Typography
          key={index}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link
            to={link.path}
            target={link.path.startsWith("http") ? "_blank" : "_self"}
            className="text-base normal-case hover:text-blue-500 duration-200"
          >
            {link.label}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="py-2 lg:py-4 my-5 shadow-none">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="li"
          to="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <Link to={paths.home.path} className="text-2xl font-bold">
            Meta Magnet
          </Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        <div className="lg:block hidden">
          <AccountMenu />
        </div>

        <div className="flex flex-row gap-3 items-center lg:hidden">
          <AccountMenu />
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {!openNav ? (
              <HiOutlineMenuAlt1 size={22} />
            ) : (
              <VscChromeClose size={22} />
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </MobileNav>
    </Navbar>
  );
}

const AccountMenu = () => {
  return (
    <>
      {true ? (
        <Menu>
          <MenuHandler>
            <Avatar
              src={
                "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
              }
              className="cursor-pointer border border-solid border-blue-500"
              referrerPolicy="no-referrer"
              alt="avatar"
              variant="circular"
            />
          </MenuHandler>
          <MenuList>
            <Link to={paths.profile.path}>
              <MenuItem>{paths.profile.label}</MenuItem>
            </Link>
            <MenuItem>
              <span>Logout</span>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Link to={paths.signIn.path}>
          <Button variant="outlined" color="blue" size="md">
            {paths.signIn.label}
          </Button>
        </Link>
      )}
    </>
  );
};
