# Fusion Crave

**Live Site:** [https://fusioncrave.surge.sh/](https://fusioncrave.surge.sh/)

---

## Project Overview

Fusion Crave is a user-friendly Recipe Book App designed for food lovers to manage their own recipes, explore recipes from others, add favorites to a wishlist, and like their preferred recipes. The app dynamically features the top recipes based on user likes, creating an engaging platform for culinary enthusiasts.

---

## Features

- **User Authentication:** Users can register and log in using email/password or Google Social Login.
- **Recipe Management:** Add, update, delete, and view recipes with detailed information.
- **Top Recipes:** Highlights the top 6 recipes sorted by like count on the homepage.
- **Private Routes:** Certain pages like Add Recipe, Recipe Details, and My Recipes are accessible only to logged-in users.
- **Interactive Likes:** Users can like recipes multiple times but cannot like their own recipes.
- **Filter & Search:** Filter recipes by cuisine type on the All Recipes page.
- **Responsive Design:** Fully responsive for mobile, tablet, and desktop devices.
- **Dark/Light Theme Toggle:** Users can switch between dark and light modes on the homepage.
- **Clean UI with Extra Sections:** Includes a slider/banner and two additional static sections for better user engagement.
- **Custom 404 Page:** A food-themed custom 404 page without navbar or footer.
- **Security & Best Practices:** Uses environment variables for Firebase config and MongoDB credentials to keep sensitive information hidden.
- **No Default Alerts:** Uses toast or sweet alert for notifications instead of default browser alerts.
- **GitHub Commits:** Minimum 15 notable commits for client side and 8 for server side to document development progress.

---

## Technologies Used

- React.js (Client Side)
- Node.js & Express.js (Server Side)
- MongoDB (Database)
- Firebase Authentication (Auth)
- Surge (Client Hosting)
- Vercel (Server Hosting)
- Tailwind CSS & DaisyUI (Styling)
- Additional Libraries: React Tooltip,  React Simple Typewriter

---

## Folder Structure (Summary)

- `/client` — React frontend application
- `/server` — Node.js backend API
- `.env` — Environment variables (excluded from repo for security)
- `README.md` — Project documentation

---

## How to Use

1. Clone the repo.
2. Set up Firebase and MongoDB credentials in `.env` files for both client and server.
3. Run the client and server locally.
4. Register or log in to start managing recipes.
5. Add, update, like, and filter recipes with a smooth user experience.
6. Deploy client on Surge and server on Vercel for production.

---

## Important Notes

- Password validation is enforced with uppercase, lowercase, and minimum 6 characters.
- User cannot like their own recipes.
- Private routes are protected and redirect to login if unauthorized.
- Responsive design ensures usability across all device sizes.
- Custom toast notifications handle all error/success feedback.
- The website complies with the project theme and all listed requirements.

---

Thank you for visiting **Fusion Crave** — your ultimate recipe companion!

---


