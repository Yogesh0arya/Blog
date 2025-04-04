import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

function WritePage() {
  const { isLoaded, isSignedIn } = useUser();

  // for React quill
  const [value, setValue] = useState("");

  // for imagekit
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    img && setValue((prev) => prev + `<p><img src="${img.url}"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  // get auth token to mutate
  const { getToken } = useAuth();

  // post
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div>You should login!</div>;
  }

  // Form validation
  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.get("title")?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.get("category")?.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.get("desc")?.trim()) {
      newErrors.desc = "Description is required";
    }

    if (!value.trim() || value === "<p><br></p>") {
      newErrors.content = "Content is required";
    }

    if (!cover) {
      newErrors.cover = "Cover image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!validateForm(formData)) {
      return;
    }

    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      // content: formData.get("content"),
      content: value,
    };

    // console.log(data);
    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-medium">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 mb-6">
        {/* Cover Image */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="w-min">
              <Upload type="image" setProgress={setProgress} setData={setCover}>
                <p className="w-max px-4 py-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
                  Add a cover image
                </p>
              </Upload>
            </div>

            {cover && <img src={cover.url} className="w-16 h-16" />}
          </div>
          {errors.cover && (
            <span className="text-red-500 text-sm">{errors.cover}</span>
          )}
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <input
            name="title"
            type="text"
            placeholder="My Awesome Story..."
            className="text-4xl font-semibold outline-none"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <label className="text-sm">Choose a category</label>
            <select
              name="category"
              id=""
              className="p-2 bg-white shadow-md rounded-lg"
            >
              <option value="general">General</option>
              <option value="web-design">Web Design</option>
              <option value="development">Development</option>
              <option value="drawing">Drawing</option>
              <option value="animation">Animation</option>
            </select>
          </div>
          {errors.category && (
            <span className="text-red-500 text-sm">{errors.category}</span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <textarea
            name="desc"
            placeholder="A Short Description"
            className="p-4 bg-white rounded-xl outline-none shadow-md"
          />
          {errors.desc && (
            <span className="text-red-500 text-sm">{errors.desc}</span>
          )}
        </div>

        {/* Content Editor */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-1">
            <div className="flex flex-col gap-2 mr-2">
              <Upload type="image" setProgress={setProgress} setData={setImg}>
                Img 🖼️
              </Upload>
              <Upload type="video" setProgress={setProgress} setData={setVideo}>
                Video🎬
              </Upload>
            </div>
            <ReactQuill
              value={value}
              onChange={setValue}
              theme="snow"
              className="flex-1 rounded-xl bg-white shadow-md"
              readOnly={progress > 0 && progress < 100}
            />
          </div>
          {errors.content && (
            <span className="text-red-500 text-sm">{errors.content}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {"Progress:" + progress}

        {mutation.isError && (
          <span className="text-red-500">{mutation.error.message}</span>
        )}
      </form>
    </div>
  );
}

export default WritePage;
