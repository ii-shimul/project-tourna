import React from "react";
import image from "../../assets/bottom.svg";
import imageTwo from "../../assets/bottom2.svg";

const Discover = () => {
	return (
		<div>
			<div className="lg:flex justify-between lg:mt-20 lg:p-0 p-5">
				<h1 className="bebas lg:w-1/2  lg:text-7xl text-4xl">
					Discover Our Impact on Games Culture
				</h1>
				<div className="">
					<p className="liter  font-semibold text-lg  ">
						Our museum proudly showcases over 300 unique exhibits, attracting
						thousands of visitors each year. Join us in celebrating the vibrant
						world of sports through our diverse events and programs.
					</p>
					<div className="flex justify-between mt-5">
						<div className="">
							<h1 className="bebas text-6xl">300+</h1>
							<p className="roboto font-semibold">
								Exhibits showcasing sneaker history and artistry.
							</p>
						</div>
						<div className="">
							<h1 className="bebas text-6xl">50k</h1>
							<p className="roboto font-semibold">
								Visitors exploring sport culture annually.
							</p>
						</div>
					</div>
					<button className="btn bg-white text-black border-black mt-5 roboto  h-12">
						Learn More
					</button>
					<button className="btn bg-white text-black  ml-5 mt-5 roboto  h-12">
						Sign Up
					</button>
				</div>
			</div>
			<div className="lg:mt-20 lg:mb-20 lg:p-0 p-5">
				<figure className="diff aspect-16/6" tabIndex={0}>
					<div className="diff-item-1" role="img">
						<img alt="daisy" src={imageTwo} />
					</div>
					<div className="diff-item-2" role="img" tabIndex={0}>
						<img alt="daisy" src={image} />
					</div>
					<div className="diff-resizer"></div>
				</figure>
			</div>
		</div>
	);
};

export default Discover;
