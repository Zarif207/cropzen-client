import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AllCrops from "../Pages/AllCrops";
import AddCrops from "../Dashboard/AddCrops";
import MyPost from "../Dashboard/MyPost";
import MyInterests from "../Dashboard/MyInterests";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import CropDetails from "../Pages/CropDetails";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Dashboard/MyProfile";
import Error404 from "../Pages/Error404";
import PremiumMembers from "../Pages/PremiumMembers";
import Marketplace from "../Pages/Marketplace";
import AboutUs from "../Pages/AboutUs";
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Dashboard/DashboardHome";
import Events from "../Pages/Events";
import AboutMore from "../Pages/AboutMore";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allCrops",
        element: <AllCrops />,
        loader: () => fetch("https://cropzen.vercel.app/crops"),
      },
      {
        path: "/premiumFarmers",
        element: <PremiumMembers />,
      },
      {
        path: "/marketplace",
        element: <Marketplace />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/events",
        element: <Events/>,
      },
      {
        path: "/aboutMore",
        element: <AboutMore/>
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/addCrops",
        element: (
          <PrivateRoute>
            <AddCrops />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myPosts",
        element: (
          <PrivateRoute>
            <MyPost />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myInterests",
        element: (
          <PrivateRoute>
            <MyInterests />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myProfile",
        element: (
          <PrivateRoute>
            <MyProfile />
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
        element: <CropDetails />,
        loader: ({ params }) =>
          fetch(`https://cropzen.vercel.app/crops/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "add-crops",
        element: <AddCrops />,
      },
      {
        path: "my-posts",
        element: <MyPost />,
      },
      {
        path: "my-interests",
        element: <MyInterests />,
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
    ],
  },
]);
