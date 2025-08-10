import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div>
			<div className="max-w-7xl mx-auto">
				<Navbar />
				<div className="min-h-[calc(100vh-477px)]">
					<Outlet />
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default MainLayout;
