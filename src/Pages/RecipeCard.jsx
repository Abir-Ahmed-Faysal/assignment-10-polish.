import React from "react";
import { Link } from "react-router";
import { IoMdHeart } from "react-icons/io";

const RecipeCard = ({ recipe }) => {
  const { _id, image, title, cuisine, categories, like } = recipe || {};

  return (
    <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-300 hover:shadow-md transition-shadow duration-300">
      <img
        src={image || "null"}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-base-content">{title}</h2>
        <p className="text-sm text-base-content/70">
          <span className="font-semibold">Cuisine:</span> {cuisine}
        </p>

        <div className="flex flex-wrap gap-2">
          {Array.isArray(categories) &&
            categories.map((cat, idx) => (
              <span
                key={idx}
                className="badge badge-outline badge-sm text-xs"
              >
                {cat}
              </span>
            ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <button className="flex items-center gap-1 text-error">
            {like}
            <IoMdHeart className="text-xl" />
          </button>

          <Link to={`/recipeDetails/${_id}`}>
            <button className="btn btn-sm btn-primary">See Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
