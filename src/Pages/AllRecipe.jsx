import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const AllRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "dsc"

  const BASE_URL = "http://localhost:3000/sorted";

  const fetchSorted = async (order) => {
    const query = order ? `?sort=${order}` : "";
    const url = `${BASE_URL}${query}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSorted(sortOrder);
  }, [sortOrder]);

  return (
    <div>
      {/* Sort Control */}
      <div className="text-center p-6">
        <label className="block mb-2 text-lg font-semibold text-gray-700">
          Sort Recipes by Popularity:
        </label>
        <select
          className="select select-bordered w-full max-w-xs mx-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Latest</option>
          <option value="asc">Famous (Low to High Likes)</option>
          <option value="dsc">Under Famous (High to Low Likes)</option>
        </select>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default AllRecipe;
