import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleCountry from "./components/SingleCountry/SingleCountry.jsx";
import Home from "./Home.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Contact from "./components/Navigation/Contact.jsx";
import Login from "./components/AuthPages/Login.jsx";
import Signup from "./components/AuthPages/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // same as path: "/", but cleaner
        element: <Login />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: ":country",
        element: <SingleCountry />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
