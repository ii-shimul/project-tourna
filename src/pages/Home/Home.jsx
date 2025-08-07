import React from "react";
import Navbar from "../../components/Navbar";
import Why from "./Why";
import Banner from "./Banner";
import Do from "./Do";
import Clients from "./Clients";
import Testimonial from "./Testimonial";
import Footer from "../../components/Footer";

const Home = () => {
	return (
		<div className="lg:pl-16 lg:pr-16 pt-5">
			<Banner/>
			<Why></Why>
			<Do></Do>
			<Clients></Clients>
			<Testimonial></Testimonial>
		</div>
	);
};

export default Home;
