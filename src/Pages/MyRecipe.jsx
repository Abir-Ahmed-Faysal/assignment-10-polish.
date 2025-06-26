import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";

const MyRecipes = () => {
  const initialRecipes = useLoaderData();
  console.log(initialRecipes);

  const [recipes, setRecipes] = useState(initialRecipes || []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const category = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => {
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
        } = recipe;

        const updateFormData = (e) => {
          e.preventDefault();
          const form = e.target;
          const data = new FormData(form);
          const formData = Object.fromEntries(data.entries());

          if (!formData.image || formData.image.trim() === "") {
            toast.warn("Please provide the image URL.");
            return;
          }
          if (!formData.title || formData.title.trim() === "") {
            toast.warn("Please enter the recipe title.");
            return;
          }
          if (!formData.ingredients || formData.ingredients.trim() === "") {
            toast.warn("Please enter the ingredients.");
            return;
          }
          if (!formData.instructions || formData.instructions.trim() === "") {
            toast.warn("Please provide the cooking instructions.");
            return;
          }
          if (!formData.cuisine || formData.cuisine === "") {
            toast.warn("Please select a cuisine type.");
            return;
          }
          if (!formData.prepTime || formData.prepTime.trim() === "") {
            toast.warn("Please enter the preparation time.");
            return;
          }
          if (selectedCategories.length === 0) {
            toast.warn("Please select at least one category.");
            return;
          }

          const finalData = {
            ...formData,
            _id,
            categories: selectedCategories,
          };

          toast.success("Recipe successfully Updated!");
          fetch("http://localhost:3000/userData", {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(finalData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount) {
                fetch("http://localhost:3000/userData")
                  .then((res) => res.json())
                  .then((data) => setRecipes(data));
              }
            });

          form.reset();
          setSelectedCategories([]);
          document.getElementById("my_modal_4").close();
        };
        const handleCheckboxChange = (e) => {
          const value = e.target.value;
          if (e.target.checked) {
            const newValue = [...selectedCategories, value];
            setSelectedCategories(newValue);
          } else {
            const newValue = [...selectedCategories];
            const finalNewValue = newValue.filter((core) => core !== value);
            setSelectedCategories(finalNewValue);
          }
        };

        const handleDelete = (id) => {
          fetch(`http://localhost:3000/userData/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount) {
                const remainingData = recipes.filter((core) => core._id !== id);
                setRecipes(remainingData);
              }
            });
        };

        return (
          <div key={_id} className="bg-base-100 rounded-2xl shadow-md p-4">
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-sm  mb-1">
              <span className="font-semibold">Ingredients:</span> {ingredients}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">Instructions:</span>{" "}
              {instructions}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">Cuisine:</span> {cuisine}
            </p>
            <p className="text-sm  mb-1">
              <span className="font-semibold">Preparation Time:</span>{" "}
              {prepTime} mins
            </p>
            <p className="text-sm  mb-1">
              <span className="font-semibold">Categories:</span>{" "}
              {categories.join(", ")}
            </p>
            <p className="text-sm flex items-center gap-1  mb-4">
              <span className="font-semibold">Likes: </span>{" "}
              <AiFillHeart className="text-xl" fill="red" /> {like}
            </p>
            <div className="flex justify-between">
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                update
              </button>
              <button
                onClick={() => handleDelete(_id)}
                className="bg-red-500 text-white px-4 py-2 rounded "
              >
                Delete
              </button>

              <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                  <h1>{title}</h1>

                  <div className="modal-action">
                    <div className="min-h-screen py-12 px-4">
                      <div className="max-w-4xl mx-auto p-8 bg-secondary rounded-2xl shadow-xl">
                        <form
                          method="dialog"
                          onSubmit={updateFormData}
                          className="space-y-6"
                        >
                          <div>
                            <label className="label font-semibold">
                              Image URL
                            </label>
                            <input
                              type="text"
                              name="image"
                              placeholder="Image URL"
                              className="input input-bordered input-primary w-full"
                            />
                          </div>

                          <div>
                            <label className="label font-semibold">
                              Recipe Title
                            </label>
                            <input
                              type="text"
                              name="title"
                              placeholder="Recipe Title"
                              className="input input-bordered input-primary w-full"
                            />
                          </div>

                          <div>
                            <label className="label font-semibold">
                              Ingredients
                            </label>
                            <textarea
                              name="ingredients"
                              placeholder="Ingredients (comma separated)"
                              className="textarea textarea-bordered textarea-primary w-full"
                              rows="3"
                            ></textarea>
                          </div>

                          <div>
                            <label className="label font-semibold">
                              Instructions
                            </label>
                            <textarea
                              name="instructions"
                              placeholder="Cooking Instructions"
                              className="textarea textarea-bordered textarea-primary w-full"
                              rows="4"
                            ></textarea>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="label font-semibold">
                                Cuisine Type
                              </label>
                              <select
                                name="cuisine"
                                className="select select-bordered select-primary w-full"
                                defaultValue=""
                                required
                              >
                                <option value="" disabled>
                                  Select Cuisine Type
                                </option>
                                <option value="Italian">Italian</option>
                                <option value="Mexican">Mexican</option>
                                <option value="Indian">Indian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Others">Others</option>
                              </select>
                            </div>

                            <div>
                              <label className="label font-semibold">
                                Preparation Time (minutes)
                              </label>
                              <input
                                type="number"
                                name="prepTime"
                                placeholder="Time in minutes"
                                className="input input-bordered input-primary w-full"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="label font-semibold">
                              Categories
                            </label>
                            <div className="flex flex-wrap gap-4">
                              {category.map((cat) => (
                                <label
                                  key={cat}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    name="categories"
                                    value={cat}
                                    checked={selectedCategories.includes(cat)}
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-primary"
                                  />
                                  <span className="">{cat}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="text-right">
                            <button
                              type="submit"
                              className="btn btn-primary px-6"
                            >
                              update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyRecipes;
