import React from "react";
import { Link } from "react-router";
import Image from "./Image";
import { format } from "timeago.js";

function PostListItem({ post }) {
  // console.log(post);
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* image */}

      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image
            src={post?.img}
            className="rounded-2xl object-cover"
            width="735"
            // 767-16-16 = 735
          />
        </div>
      )}

      {/* details */}
      <div className="w-full flex flex-col gap-4 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link
            to={`/posts?author=${post.user.username}`}
            className="text-blue-800"
          >
            {post.user.username}
          </Link>

          <span>on</span>
          <Link className="text-blue-800">{post.category}</Link>

          <span>{format(post.createdAt)}</span>
        </div>
        <p>{post.desc}</p>
        <Link to={`/${post.slug}`} className="underline text-sm text-blue-800">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostListItem;
