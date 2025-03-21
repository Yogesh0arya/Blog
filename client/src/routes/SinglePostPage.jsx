import React from "react";
import Image from "../components/Image";
import { Link, useParams } from "react-router";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
import Parser from "html-react-parser";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);

  return res.data;
};

function SinglePostPage() {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading...";
  if (error) return "Something went wrong! " + error.message;
  if (!data) return "Post not found!";

  // console.log(data);

  return (
    <div
      className="flex flex-col fap8
  "
    >
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user.username}</Link>

            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>

            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} width="600" className="rounded-2xl" />
          </div>
        )}
      </div>

      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:text-lg flex flex-col text-justify ">
          {Parser(data.content)}
          {/* {data.content} */}
        </div>

        {/* side menu */}
        <div className="mt-2 px-4 h-max sticky top-8">
          <h1 className="mb-4 text-medium font-medium">Author</h1>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <Image
                  src={data.user.img}
                  className="rounded-full w-12 h-12 object-cover"
                  width="48"
                  height="48"
                />
              )}
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500">
              I'm a software developer, done my btech
            </p>

            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" className="w-6" />
              </Link>
              <Link>
                <Image src="instagram.svg" className="w-6" />
              </Link>
            </div>
          </div>

          <PostMenuActions post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="underline">
              All
            </Link>
            <Link to="/" className="underline">
              Web Design
            </Link>
            <Link to="/" className="underline">
              Development
            </Link>
            <Link to="/" className="underline">
              Drawing
            </Link>
            <Link to="/" className="underline">
              Animation
            </Link>
          </div>

          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
}

export default SinglePostPage;
