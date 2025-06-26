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
import Contact from "../Pages/Contact";
import AboutUs from "../Pages/AboutUs";
import Dashboard from "../Pages/Dashboard/Dashboard";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        hydrateFallbackElement: (
          <div className="absolute top-[50%] text-secondary left-[50%]">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        ),
        loader: () => fetch("https://fusioncrave.vercel.app/sorted?sort=dsc"),
        element: <Home />,
      },
      {
        path: "/allRecipe",
        element: <AllRecipe />,
      },
      {
        path: "/logIn",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      }, {
        path: "recipeDetails/:id",
        hydrateFallbackElement: (
          <div className="absolute top-[50%] text-secondary left-[50%]">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        ),
        loader: ({ params }) =>
          fetch(`https://fusioncrave.vercel.app/userData/${params.id}`),
        element: <RecipeDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "addRecipe",
        element: <AddRecipe />,
      },
      {
        path: "myRecipe/:email",
        hydrateFallbackElement: (
          <div className="absolute top-[50%] text-secondary left-[50%]">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        ),
        loader: ({ params }) =>
          fetch(`https://fusioncrave.vercel.app/userData/recipe/${params.email}`),
        element: <MyRecipe />,
      },
      {
        path: "myWishlist",
        element: <MyWishlist />,
      },
     
    ],
  },
]);
