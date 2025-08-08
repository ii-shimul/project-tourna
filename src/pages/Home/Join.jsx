import React from "react";
import image from "../../assets/Team lineup-pana.svg";

const Join = () => {
	return (
		<div className="lg:flex items-center justify-between p-5 lg:p-0 lg:mt-0 mt-15">
			<div>
				<h1 className="bebas  text-7xl">Join the Sneaker Revolution</h1>
				<p className="liter font-semibold text-xl">
					Dive deeper into sneaker culture and secure your tickets or
					memberships today!
				</p>
				<button className="btn bg-white text-black border-black mt-5 roboto  h-12">
					Explore
				</button>
				<button className="btn bg-white text-black  ml-5 mt-5 roboto  h-12">
					Sign Up
				</button>
			</div>
			<img
				className="lg:w-1/2 lg:mt-0 mt-5 lg:h-[600px]"
				src={image}
				alt="Red Sneakers"
			/>
		</div>
	);
};

export default Join;
