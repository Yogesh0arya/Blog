import React, { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

function PostListPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="mb-8 text-2xl">Development Blog</h1>
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-800 text-sm text-white px-4 py-2 rounded-xl md:hidden mb-4"
      >
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row md:justify-between">
        <div>
          <PostList />
        </div>
        <div className={`${!open && "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
}

export default PostListPage;
