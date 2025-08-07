import React from "react";
const Clients = () => {
	return (
		<div className="mb-20 lg:mt-20 mt-10 -4">
			<div
				className="w-full max-w-[90%] mx-auto h-auto bg-cover p-6 sm:p-10 lg:p-30
rounded-4xl flex flex-col lg:flex-row justify-between bg-center"
				style={{
					backgroundImage: `url(${"npm i react-router-dom"})`,
				}}
			>
				<div className="lg:w-1/2"></div>
				<div className="lg:w-1/2 text-center lg:text-left ">
					<h1 className=" poppins-semibold text-3xl sm:text-4xl lg:text-6xl mt-5 text-white lg:mt-10">
						Subscribe for offer update
					</h1>
					<p className="poppins-regular text-sm text-white sm:text-base lg:text-lg mt-3">
						Subscribe to our newsletter for regular updates so you can stay
						informed about us.
					</p>
					<div className="flex flex-col sm:flex-row items-center sm:items-start mt-5">
						<input
							type="text"
							className="w-full opacity-100 sm:w-80 pl-5 h-14 -none rounded-full bg-white
poppins mb-3 sm:mb-0"
							placeholder="Enter your email"
						/>
						<button className="btn h-14 rounded-full sm:ml-2 bg-black text-white w-36">
							Subscribe
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Clients;
