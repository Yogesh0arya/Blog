import React, { useEffect, useState } from "react";
import Image from "./Image";
import { Link } from "react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { getToken } = useAuth();

  // useEffect(() => {
  //   getToken().then((token) => console.log(token));
  // }, []);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image
          src="logo.png"
          alt="logo"
          width={32}
          height={32}
          className="bg-transparent"
        />
        <span>YO BLOG</span>
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden z-50">
        <button
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-2xl"
        >
          {open ? "X" : "-"}
        </button>

        <div
          className={`w-full h-screen p-5 flex flex-col gap-6 font-medium text-lg absolute top-16 bg-black text-white transition-all ease-in-out ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
          <SignedIn>
            <div className="flex gap-2">
              <UserButton /> <p>Profile</p>
            </div>
          </SignedIn>
          <Link to="/" onClick={() => setOpen(!open)}>
            Home
          </Link>
          <Link to="/posts" onClick={() => setOpen(!open)}>
            All Posts
          </Link>
          <Link to="/write" onClick={() => setOpen(!open)}>
            Write
          </Link>
          <Link onClick={() => setOpen(!open)} to="/posts?sort=trending">
            Trending
          </Link>
          <Link onClick={() => setOpen(!open)} to="/posts?sort=popular">
            Most Popular
          </Link>
          <Link onClick={() => setOpen(!open)} to="/">
            About
          </Link>
          <SignedOut>
            <Link to="/login">
              <button
                onClick={() => setOpen(!open)}
                className="py-2 px-4 rounded-3xl bg-blue-800 text-white cursor-pointer"
              >
                Login 👋
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <SignOutButton className="flex cursor-pointer">
              Logout
            </SignOutButton>
          </SignedIn>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/posts?sort=trending">Trending</Link>
        <Link to="/posts?sort=popular">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white cursor-pointer">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
