import React from "react";
import Search from "./Search";
import { Link, useSearchParams } from "react-router";

function SideMenu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };

  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };

  return (
    <div className="h-max px-4 sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />

      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />{" "}
          Newest
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />{" "}
          Most Popular
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />{" "}
          Trending
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />{" "}
          Oldest
        </label>
      </div>

      <h1 className="mt-8 mb-4 text-sm font-medium">Category</h1>
      <div className="cursor-pointer flex flex-col gap-2 text-sm">
        <span
          onClick={() => handleCategoryChange("general")}
          className="cursor-pointer underline"
        >
          All
        </span>
        <span
          onClick={() => handleCategoryChange("web-design")}
          className="cursor-pointer underline"
        >
          Web Design
        </span>
        <span
          onClick={() => handleCategoryChange("development")}
          className="cursor-pointer underline"
        >
          Development
        </span>
        <span
          onClick={() => handleCategoryChange("drawing")}
          className="cursor-pointer underline"
        >
          Drawing
        </span>
        <span
          onClick={() => handleCategoryChange("animation")}
          className="cursor-pointer underline"
        >
          Animation
        </span>
      </div>
    </div>
  );
}

export default SideMenu;
