import React, { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const category = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleFormData = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const formData = Object.fromEntries(data.entries());
    const userEmail = user?.email;
    const userDisplayName = user?.displayName;
    const userPhotoUrl = user?.photoURL;
    const like = "0";

    if (!formData.image?.trim()) {
      toast.warn("Please provide the image URL.");
      return;
    }
    if (!formData.title?.trim()) {
    toast.warn("Please enter the recipe title.");
      return;
    }
    if (!formData.ingredients?.trim()) {
     toast.warn("Please enter the ingredients.");
      return;
    }
    if (!formData.instructions?.trim()) {
      alert("Please provide the cooking instructions.");
      return;
    }
    if (!formData.cuisine) {
      toast.warn("Please select a cuisine type.");
      return;
    }
    if (!formData.prepTime?.trim()) {
      toast.warn("Please enter the preparation time.");
      return;
    }
    if (selectedCategories.length === 0) {
    toast.warn("Please select at least one category.");
      return;
    }

    const finalData = {
      ...formData,
      like,
      userDisplayName,
      userPhotoUrl,
      userEmail,
      categories: selectedCategories,
    };

    toast.success("Recipe successfully submitted!");
    fetch("http://localhost:3000/userData", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(finalData),
    })
      .then((res) => res.json())
      .then((data) => console.log("the server returned:", data));

   
    form.reset();
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-third">
      <div className="max-w-4xl mx-auto p-8 bg-base-100 text-base-content rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          🍽️ Add New Recipe
        </h2>

        <form onSubmit={handleFormData} className="space-y-6">
          <div>
            <label className="label text-secondary font-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label text-secondary font-semibold">Recipe Title</label>
            <input
              type="text"
              name="title"
              placeholder="Recipe Title"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label text-secondary font-semibold">Ingredients</label>
            <textarea
              name="ingredients"
              placeholder="Ingredients (comma separated)"
              className="textarea textarea-bordered w-full"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="label text-secondary font-semibold">Instructions</label>
            <textarea
              name="instructions"
              placeholder="Cooking Instructions"
              className="textarea textarea-bordered w-full"
              rows="4"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-secondary font-semibold">Cuisine Type</label>
              <select
                name="cuisine"
                className="select select-bordered w-full"
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
              <label className="label font-semibold text-secondary">
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                name="prepTime"
                placeholder="Time in minutes"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="label text-secondary font-semibold">Categories</label>
            <div className="flex flex-wrap gap-4">
              {category.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="categories"
                    value={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={handleCheckboxChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="text-right">
            <button type="submit" className="btn btn-primary px-6">
              ➕ Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
