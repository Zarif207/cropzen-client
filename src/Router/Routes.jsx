import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AllCrops from "../Pages/AllCrops";
import AddCrops from "../Pages/AddCrops";
import MyPost from "../Pages/MyPost";
import MyInterests from "../Pages/MyInterests";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import CropDetails from "../Components/CropDetails";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allCrops",
        element: <AllCrops />,
      },
      {
        path: "/addCrops",
        element: (
          <PrivateRoute>
            <AddCrops />
          </PrivateRoute>
        ),
      },
      {
        path: "/myPosts",
        element: (
          <PrivateRoute>
            <MyPost />
          </PrivateRoute>
        ),
      },
      {
        path: "/myInterests",
        element: (
          <PrivateRoute>
            <MyInterests />
          </PrivateRoute>
        ),
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/cropDetails/:id",
        element: (
          <PrivateRoute>
            <CropDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/crops/${params.id}`),
      },
    ],
  },
]);