import React from "react";
import SingleComment from "./SingleComment";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );

  return res.data;
};

function Comments({ postId }) {
  // upload comment
  const { getToken } = useAuth();
  const { user } = useUser();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onSuccess: () => {
      // to refresh the page
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },

    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      desc: formData.get("desc"),
    };

    mutation.mutate(data);
  };

  // fetch comments
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  return (
    <div className="my-8 flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      {user && (
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between gap-8 w-full"
        >
          <textarea
            name="desc"
            placeholder="Write a comment..."
            className="bg-white w-full p-4 outline-none rounded-2xl"
          />
          <button className="bg-blue-800 px-4 py-2 rounded-xl text-white font-medium">
            Send
          </button>
        </form>
      )}
      {/* {console.log(data)} */}
      {isPending ? (
        "Loading..."
      ) : error ? (
        "Error loading comments!"
      ) : (
        <>
          {mutation.isPending && (
            <SingleComment
              comment={{
                desc: `${mutation.variables.desc} (Sending...)`,
                createdAt: new Date(),
                user: {
                  img: user.imageUrl,
                  username: user.username,
                },
              }}
            />
          )}

          {data.map((comment) => (
            <SingleComment
              key={comment._id}
              comment={comment}
              postId={postId}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Comments;
