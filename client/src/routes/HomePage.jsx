import React, { useEffect } from "react";
import { Link } from "react-router";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";
import { useUser } from "@clerk/clerk-react";

const HomePage = () => {
  // const { isSignedIn, user, isLoaded } = useUser();
  // console.log(user);
  // useEffect(() => {
  //   setT
  // }, [user]);
  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="mt-4 flex flex-col gap-4 ">
      {/* BreadCrumb */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span>•</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>

      {/* Introduction */}
      <div className="flex items-center justify-between">
        {/* titles */}
        <div>
          <h1 className="text-blue-800 text-2xl md:text-5xl lg:text-6xl font-bold">
            Inspire Millions of people
          </h1>
          <p className="mt-8 text-md md:text-lg">
            Trusted by business builders worldwide, the Yo Blogs are your
            number-one source for education and inspiration.
          </p>
        </div>

        {/* Animated Button Link */}
        <Link to="write" className="hidden md:block relative">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest animate-spin animatedButton"
            // className="text-lg tracking-widest"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>

      {/* Categories */}
      <MainCategories />

      {/* Featured Posts */}
      <FeaturedPosts />

      {/* Post List */}
      <div>
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;
