import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import AddItem from "../pages/AddItem";
import PrivateRoute from "./PrivateRoute";
import AllItems from "../pages/AllItemsPage";
import MyItems from "../pages/MyItems";
import UpdateItem from "../pages/UpdateItem";
import RecoveredItemsPage from "../pages/RecoveredItemsPage";
import ItemDetailsPage from "../pages/ItemDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/add-item',
        element: <PrivateRoute><AddItem></AddItem></PrivateRoute>
      },
      {
        path: '/my-items',
        element: <PrivateRoute><MyItems></MyItems></PrivateRoute>
      },
      {
        path: '/updateItem/:id',
        element: <PrivateRoute><UpdateItem></UpdateItem></PrivateRoute>
      },
      {
        path: '/recovered-items',
        element: <PrivateRoute><RecoveredItemsPage></RecoveredItemsPage></PrivateRoute>
      },
      {
        path: '/items/:id',
        element: <PrivateRoute><ItemDetailsPage></ItemDetailsPage></PrivateRoute>
      },
      {
        path: '/lost-found-items',
        element: <AllItems></AllItems>
      }
    ],
  },

  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "*",
    Component: NotFound
  }
]);

export default router;
