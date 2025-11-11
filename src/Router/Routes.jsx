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
        element: <AddCrops />,
      },
      {
        path: "/myPosts",
        element: <MyPost />,
      },
      {
        path: "/myInterests",
        element: <MyInterests />,
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
        loader: ({params}) => fetch(`http://localhost:3000/crops/${params.id}`),
        Component: CropDetails,
      },
    ],
  },
]);
