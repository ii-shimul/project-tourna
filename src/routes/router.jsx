import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Tournaments from "../pages/Tournaments/Tournaments";
import TournamentDetails from "../pages/Tournaments/Details";
import Teams from "../pages/Teams/Teams";
import Private from "./Private";

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
        element: (
          <Private>
            <Tournaments />
          </Private>
        ),
      },
      {
        path: "/tournaments/:id",
        element: (
          <Private>
            <TournamentDetails />
          </Private>
        ),
      },
      {
        path: "/teams",
        element: (
          <Private>
            <Teams />
          </Private>
        ),
      },
    ],
  },
]);

export default router;
