import React from "react";
import { Link } from "react-router";
import Search from "./Search";

function MainCategories() {
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* Links */}
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <Link
          to="/posts"
          className="bg-blue-800 text-white rounded-full px-4 py-2"
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=web-design"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Web Design
        </Link>
        <Link
          to="/posts?cat=development"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Development
        </Link>
        <Link
          to="/posts?cat=drawing"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Drawing
        </Link>
        <Link
          to="/posts?cat=animation"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Animation
        </Link>
      </div>

      <span className="text-xl font-medium">|</span>
      {/* Search */}
      <Search />
    </div>
  );
}

export default MainCategories;
