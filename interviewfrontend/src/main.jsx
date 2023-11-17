import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Student from "./routes/Student.jsx";
import Teacher from "./routes/Teacher.jsx";
import Marks from "./routes/Marks.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Student />,
  },
  {
    path: "/students",
    element: <Student />,
  },
  {
    path: "/teachers",
    element: <Teacher />,
  },
  {
    path: "/marks",
    element: <Marks />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
