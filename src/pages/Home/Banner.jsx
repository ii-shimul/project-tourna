import React from "react";
import { GoStarFill } from "react-icons/go";
const Banner = () => {
	return (
		<div className="mt-16 -4">
			<div className="lg:flex justify-between items-center ">
				<div>
					<div className="lg:flex items-center">
						<h1 className="lg:text-9xl text-6xl ml-5 lg:ml-0 quando break-words">
							Enjoy
						</h1>
						<img
							src={"https://placehold.co/400"}
							alt=""
							className="w-28 h-28 ml-7 hidden lg:block"
						/>
					</div>
					<h1 className="lg:text-9xl text-6xl ml-5 lg:ml-0 quando line -4 mt-2">
						Your Food
					</h1>
					<div className="lg:flex items-center ml-5 lg:mt-5 mt-2 ">
						<p className="text-lg poppins w-80 text-[#5C5C5C]">
							Purest food experience focusing on premium quality ingredient{" "}
						</p>
						<a
							className="btn bg-[#FB5C60] text-white poppins rounded-lg roboto lg:w-40
lg:h-14 p-5 lg:p-0 mt-4 lg:mt-4"
						>
							Check menu
						</a>
					</div>
					<div className="flex items-center mb-5 lg:mb-0 ml-5 mt-5 font-semibold">
						<p className="text-base poppins">our happy customer</p>
						<GoStarFill className="text-[#FDC405] ml-2 text-2xl mr-1" />
						<p>4.8</p>
						<p className="text-red-500">(5k Reviews)</p>
					</div>
				</div>
				<img
					src={"https://placehold.co/400"}
					alt=""
					className="max-w-full object-cover"
				/>
			</div>
		</div>
	);
};
export default Banner;
