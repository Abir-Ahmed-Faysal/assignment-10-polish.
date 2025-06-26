import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import RecipeCard from "./RecipeCard";

const AllRecipe = () => {
  const recipes = useLoaderData();
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const recipesData =
    selectedCuisine === ""
      ? recipes
      : recipes.filter((core) => core.cuisine === selectedCuisine);

  return (
    <div>
      <div className="text-center">
        <div className="p-6">
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Filter by Cuisine Type:
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
          >
            <option value={""}>Select Cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {recipesData.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default AllRecipe;
