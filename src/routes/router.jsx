import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Add from "../pages/Tournament/Add";
import Manage from "../pages/Tournament/Manage";
import AddTeam from "../pages/AddTeam/AddTeam";
import ManageTeams from "../pages/ManageTeams/ManageTeams";
                                   
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
        path: "/add-tournament",
        element: <Add />,
      },
      {
        path: "/manage-tournament",
        element: <Manage />,
      },
			{
				path:"/add-team",
				element:<AddTeam></AddTeam>
			},
			{
				path:"/Manage-team",
				element : <ManageTeams></ManageTeams>
			},
    ],
  },
]);

export default router;
