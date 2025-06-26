import { useLoaderData } from "react-router";
import { Link } from "react-router";
import { FaRegHeart } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import FeaturesSection from "./Home/FeatureSection";

const Home = () => {
  const dataValue = useLoaderData();
  const topRecipes = dataValue || [];

  return (
    Array.isArray(topRecipes) && (
      <div>
        {/* Banner */}
        <div className="w-full mb-10">
          <div className="carousel-item h-[65vh] w-full bg-[rgb(249,237,216)] bg-cover bg-center flex items-center justify-between px-4 lg:px-20 relative">
            {/* Text section */}
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-2xl md:text-4xl text-secondary font-extrabold">
                <Typewriter
                  words={[
                    "Taste &",
                    "Discover mouthwatering dishes",
                    "Master new flavors",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={2000}
                />
              </h1>

              <div className="text-black">
                <h2 className="text-lg md:text-xl font-semibold flex flex-wrap items-center gap-3">
                  <span>Premium Ingredients</span>
                  <span className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-black font-bold">Fresh Frozen</span>
                  <span className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-black font-bold">Ready Instantly</span>
                </h2>
              </div>

              <button className="btn bg-primary text-white px-6 py-2 text-lg rounded-md shadow hover:scale-105 transition w-fit">
                SHOP NOW
              </button>
            </div>

            {/* Image section */}
            <div className="hidden md:block w-1/2">
              <img
                src="https://i.ibb.co/8nqR7xrW/GIF-Loop-Mince.webp"
                alt="Banner GIF"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="text-center py-12 px-4">
          <FeaturesSection />
        </section>

        {/* Recipes */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">Our Best Recipes</h2>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {topRecipes.map((recipe) => (
              <div key={recipe._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
                <figure>
                  <img
                    src={recipe.image || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={recipe.title}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{recipe.title}</h2>
                  <p className="text-sm text-gray-600">Cuisine: {recipe.cuisine}</p>
                  <div className="flex items-center gap-2 text-red-500">
                    <FaRegHeart /> {recipe.like}
                  </div>
                  <div className="card-actions justify-end mt-2">
                    <Link to={`/recipeDetails/${recipe._id}`}>
                      <button className="btn btn-primary btn-sm">View Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/allRecipe">
              <button className="btn btn-outline btn-accent">See All Recipes</button>
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="bg-base-200 py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6">Our Best Services</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Neat & Organized",
                  desc: "Well-structured recipes that are easy to follow and maintain.",
                },
                {
                  title: "Delicious & Reliable",
                  desc: "Tested and trusted recipes from real users across the globe.",
                },
                {
                  title: "Attractive Place",
                  desc: "You can get a smart and attractive view. This reduces your daily life monotony.",
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="p-6 bg-green-500 hover:bg-orange-400 text-white rounded-xl shadow transition-all"
                >
                  <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                  <p>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-primary text-primary-content py-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="mb-6">
              Get the latest updates, recipes, and cooking tips directly in your inbox!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full sm:w-2/3"
              />
              <button className="btn btn-accent">Subscribe</button>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default Home;
