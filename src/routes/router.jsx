import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import AddTournament from "../pages/Tournament/Add";
import ManageTournament from "../pages/Tournament/Manage";
import AddTeam from "../pages/Teams/Add";
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
        path: "/add-tournament",
        element: <AddTournament />,
      },
      {
        path: "/manage-tournament",
        element: <ManageTournament />,
      },
			{
				path:"/add-team",
				element:<AddTeam></AddTeam>
			},
			{
				path:"/manage-team",
				element : <ManageTeams></ManageTeams>
			},
    ],
  },
]);

export default router;
