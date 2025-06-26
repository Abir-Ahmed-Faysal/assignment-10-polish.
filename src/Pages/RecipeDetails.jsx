import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineClockCircle,
} from "react-icons/ai";
import AuthContext from "../Context/AuthContext";

const RecipeDetails = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);

  const {
    _id,
    image,
    title,
    ingredients,
    instructions,
    cuisine,
    prepTime,
    categories,
    like,
    userDisplayName,
    userPhotoUrl,
    userEmail,
  } = data || {};

  const [likes, setLikes] = useState(parseInt(like) || 0);
  const [liked, setLiked] = useState(false);

  const isOwner = user?.email === userEmail;

  const handleLike = (id) => {
    if (isOwner) return;

    const newLikeCount = liked ? likes - 1 : likes + 1;
    setLikes(newLikeCount);
    setLiked(!liked);

    fetch(`http://localhost:3000/userData/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ like: newLikeCount }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Server returned:", data));
  };

  return (
    <div className="min-h-screen bg-third text-base-content py-8 px-4">
      <div className="max-w-5xl mx-auto mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl shadow-inner text-center">
        <p className="text-lg md:text-xl font-semibold text-pink-700 dark:text-pink-300">
          {likes} people interested in this recipe
        </p>
      </div>

      <div className="card lg:card-side bg-base-200 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-5xl mx-auto rounded-2xl overflow-hidden">
        <figure className="lg:w-1/2">
          <img
            src={image || "https://via.placeholder.com/600x400"}
            alt={title}
            className="object-cover w-full h-full"
          />
        </figure>

        <div className="card-body lg:w-1/2 p-8">
          <h2 className="card-title text-2xl md:text-3xl text-primary mb-2">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
            <AiOutlineClockCircle /> {cuisine} • {prepTime} min
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {categories?.map((cat, i) => (
              <div key={i} className="badge badge-outline badge-secondary">
                {cat}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-1">Ingredients</h3>
            <p className="text-gray-700 dark:text-gray-300">{ingredients}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-1">Instructions</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{instructions}</p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <img
                src={userPhotoUrl}
                alt={userDisplayName}
                className="w-10 h-10 rounded-full border border-primary"
              />
              <div>
                <p className="font-bold ">{userDisplayName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{userEmail}</p>
              </div>
            </div>

            <button
              onClick={() => handleLike(_id)}
              className="btn btn-sm gap-2 transition"
            >
              {liked ? (
                <AiFillHeart fill="red" className="text-xl" />
              ) : (
                <AiOutlineHeart fill="red" className="text-xl" />
              )}
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
