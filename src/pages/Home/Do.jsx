import React from "react";

const Do = () => {
	return (
		<div className="lg:flex lg:items-center lg:mt-0 mt-20 block lg:text-left text-center justify-between">
			<div className="lg:w-1/2 w-full lg:text-left text-center">
				<h1 className="poppins-semibold text-3xl lg:text-6xl">
					Do you have any dinner <br /> plan today?
				</h1>
				<p className="poppins-regular text-[#5C5C5C] mt-6 mb-2 text-base">
					Make online reservation, read restaurant reviews, and earn points
					towards free meals. OpenTable is a real-time online reservation
					system.
				</p>
				<a
					className="btn bg-[#FB5C60] poppins-medium text-white rounded-lg roboto
          h-12"
				>
					Make a reservation
				</a>
			</div>

			<div className="lg:w-1/2 w-full mt-6 lg:mt-0">
				<img
					src={"https://placehold.co/400"}
					alt="Sushi"
					className="w-full h-auto"
				/>
			</div>
		</div>
	);
};

export default Do;
