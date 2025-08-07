import React from "react";
import { TbToolsKitchen3 } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";

const Why = () => {
	return (
		<div className="mt-20 lg:mb-40">
			<div className="items-center justify-center text-center">
				<h1 className="text-lg poppins-medium text-[#F48E28]">Services</h1>
				<h1 className="lg:text-6xl text-4xl poppins-semibold mt-3">
					Why Choose Our Favorite Food
				</h1>
			</div>
			<div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-1 space-y-8 mt-10 p-6">
				<div className="flex items-center justify-center text-center">
					<div className="flex flex-col items-center">
						<TbToolsKitchen3 className="text-6xl border-4 text-[#F48E28] rounded-full bg-[#F5DDC4] p-2" />
						<h1 className="text-2xl poppins-medium mt-4">Qualityfull Food</h1>
						<p className="w-80 h-16 poppins-regular text-sm mt-3 text-[#5C5C5C]">
							But I must explain to you how all this mistaken idea of denouncing
							pleasur and prasising pain was bron.
						</p>
					</div>
				</div>
				<div className="flex items-center justify-center text-center">
					<div className="flex flex-col items-center">
						<FaTruck className="text-6xl border-4 text-[#F48E28] rounded-full bg-[#F5DDC4] p-2" />
						<h1 className="text-2xl poppins-medium mt-4">Fast Delivery</h1>
						<p className="w-80 h-16 poppins-regular text-sm mt-3 text-[#5C5C5C]">
							But I must explain to you how all this mistaken idea of denouncing
							pleasur and prasising pain was bron.
						</p>
					</div>
				</div>
				<div className="flex items-center justify-center text-center">
					<div className="flex flex-col items-center">
						<IoFastFoodOutline className="text-6xl border-4 text-[#F48E28] rounded-full bg-[#F5DDC4] p-2" />
						<h1 className="text-2xl poppins-medium mt-4">Healthy Food</h1>
						<p className="w-80 h-16 poppins-regular text-sm mt-3 text-[#5C5C5C]">
							But I must explain to you how all this mistaken idea of denouncing
							pleasur and prasising pain was bron.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Why;
