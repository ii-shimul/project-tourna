import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AddTeam from "../pages/AddTeam/AddTeam";

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
				path:"/add-team",
				element : <AddTeam></AddTeam>
			},
		],
	},
]);

export default router;
