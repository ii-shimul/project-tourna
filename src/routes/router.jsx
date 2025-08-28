import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Tournaments from "../pages/Tournaments/Tournaments";
import ManageTournament from "../pages/Tournaments/Manage";
import Teams from "../pages/Teams/Teams";
import ManageTeams from "../pages/Teams/Manage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/tournaments",
        element: <Tournaments />,
      },
      {
        path: "/manage-tournament",
        element: <ManageTournament />,
      },
      {
        path: "/teams",
        element: <Teams />,
      },
      {
        path: "/manage-team",
        element: <ManageTeams></ManageTeams>,
      },
    ],
  },
]);

export default router;
