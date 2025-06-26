import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home";
import AllRecipe from "../Pages/AllRecipe";
import AddRecipe from "../Pages/AddRecipe";
import MyRecipe from "../Pages/MyRecipe";
import MyWishlist from "../Pages/MyWishlist";
import Register from "../Pages/Register";
import LogIn from "../Pages/LogIn";
import PrivateRoute from "../Secure/PrivateRoute";
import RecipeDetails from "../Pages/RecipeDetails";
import Error from "../Pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        hydrateFallbackElement: <div className="absolute top-[50%] text-secondary left-[50%]">
          <span className="loading loading-spinner loading-xl"></span>
        </div>,
        loader: () => fetch("http://localhost:3000/sorted?sort=dsc"),
        element: <Home></Home>,
      },
      {
        path: "/allRecipe",
        hydrateFallbackElement: <div className="absolute top-[50%] text-secondary left-[50%]">
          <span className="loading loading-spinner loading-xl"></span>
        </div>,
        loader: () => fetch("http://localhost:3000/userData"),
        element: <AllRecipe></AllRecipe>,
      },
      {
        path: "/addRecipe",
        element: (
          <PrivateRoute>
            <AddRecipe></AddRecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "/myRecipe/:email",
        hydrateFallbackElement: <div className="absolute top-[50%] text-secondary left-[50%]">
          <span className="loading loading-spinner loading-xl"></span>
        </div>,
        loader: ({ params }) =>
          fetch(
            `http://localhost:3000/userData/recipe/${params.email}`
          ),
        element: (
          <PrivateRoute>
            <MyRecipe></MyRecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "/myWhitelist",
        element: (
          <PrivateRoute>
            <MyWishlist></MyWishlist>
          </PrivateRoute>
        ),
      },
      {
        path: "/logIn",
        element: <LogIn></LogIn>,
      },
      { path: "/register", element: <Register></Register> },
      {
        path: "/recipeDetails/:id",
        hydrateFallbackElement: <div className="absolute top-[50%] text-secondary left-[50%]">
          <span className="loading loading-spinner loading-xl"></span>
        </div>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/userData/${params.id}`),
        element: (
          <PrivateRoute>
            <RecipeDetails></RecipeDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
