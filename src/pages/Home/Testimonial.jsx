import React from "react";
import { VscQuote } from "react-icons/vsc";
const Testimonial = () => {
	return (
		<div className="">
			<div className="flex flex-col justify-center items-center text-center w-full px-4">
				<p className="poppins-regular text-base text-[#F48E28]">TESTIMONIALS</p>
				<h1 className="poppins-semibold text-3xl sm:text-5xl lg:text-6xl mt-3">
					What our clients say about us
				</h1>
			</div>
			<div className=" grid lg:grid-cols-3 p-10 lg:space-y-0 space-y-5">
				<div className="bg-[#FFF8EE] rounded-4xl w-full sm:w-80 md:w-96 lg:w-[400px] p-5">
					<VscQuote className="w-24 h-24 text-[#FB6465]" />
					<p className="poppins-regular mt-3 text-[#5C5C5C]">
						"Amazing food with rich flavors! The menu has great variety, and
						everything we ordered tasted perfect. Friendly staff and quick
						service made the experience even better. Highly recommended!”
					</p>
					<div className="flex items-center space-x-3 mt-10">
						<img
							className="rounded-full w-12 h-12 object-cover"
							src={"https://placehold.co/400"}
							alt="Tom Williams"
						/>
						<div>
							<h1 className="text-[#103342] text-lg poppins-semibold">
								Tom Williams
							</h1>
							<p className="text-[#7C7C7C] text-sm">Software Developer</p>
						</div>
					</div>
				</div>
				<div className="bg-[#FFF8EE] rounded-4xl w-full sm:w-80 md:w-96 lg:w-[400px] p-5">
					<VscQuote className="w-24 h-24 text-[#FB6465]" />
					<p className="poppins-regular mt-3 text-[#5C5C5C]">
						"Amazing food with rich flavors! The menu has great variety, and
						everything we ordered tasted perfect. Friendly staff and quick
						service made the experience even better. Highly recommended!”
					</p>
					<div className="flex items-center space-x-3 mt-10">
						<img
							className="rounded-full w-12 h-12 object-cover"
							src={"https://placehold.co/400"}
							alt="Tom Williams"
						/>
						<div>
							<h1 className="text-[#103342] text-lg poppins-semibold">
								Tom Williams
							</h1>
							<p className="text-[#7C7C7C] text-sm">Software Developer</p>
						</div>
					</div>
				</div>{" "}
				<div className="bg-[#FFF8EE] rounded-4xl w-full sm:w-80 md:w-96 lg:w-[400px] p-5">
					<VscQuote className="w-24 h-24 text-[#FB6465]" />
					<p className="poppins-regular mt-3 text-[#5C5C5C]">
						"Amazing food with rich flavors! The menu has great variety, and
						everything we ordered tasted perfect. Friendly staff and quick
						service made the experience even better. Highly recommended!”
					</p>
					<div className="flex items-center space-x-3 mt-10">
						<img
							className="rounded-full w-12 h-12 object-cover"
							src={"https://placehold.co/400"}
							alt="Tom Williams"
						/>
						<div>
							<h1 className="text-[#103342] text-lg poppins-semibold">
								Tom Williams
							</h1>
							<p className="text-[#7C7C7C] text-sm">Software Developer</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Testimonial;
