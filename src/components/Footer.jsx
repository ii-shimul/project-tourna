import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
	return (
		<div>
			<div>
				<div className="lg:flex justify-between lg:p-5 p-5 mt-25 mb-5 ">
					<div>
						<div className="flex items-center space-x-2 mb-5">
							<img
								src={"https://placehold.co/400"}
								alt=""
								className="w-12 h-12"
							/>
							<h1 className="poppins-semibold text-2xl">FlavourHUb</h1>
						</div>
						<h1 className="poppins-regular lg:w-1/2 text-sm text-[#5C5C5C]">
							We see customer as guest and ourselves as host,with a duty to
							improve thier experience in every way.
						</h1>
						<div className="flex space-x-3 mt-5 lg:mb-0 mb-10">
							<p className="text-base text-[#0A142F]">
								<FaFacebook />
							</p>
							<p className="text-base text-[#0A142F]">
								<FaSquareInstagram />
							</p>
							<p className="text-base text-[#0A142F]">
								<BsTwitterX />
							</p>
							<p className="text-base text-[#0A142F]">
								<IoLogoLinkedin />
							</p>
							<p className="text-base text-[#0A142F]">
								<FaYoutube />
							</p>
						</div>
					</div>
					<div className="space-y-3">
						<h1 className="poppins-semibold text-[#0A142F] text-base">
							Product
						</h1>
						<p className="text-base poppins-medium text-[#0A142F] opacity50">
							Foodies
						</p>
						<p className="text-base poppins-medium text-[#0A142F] opacity-50">
							Dishes
						</p>
						<p className="text-base poppins-medium text-[#0A142F] opacity-50">
							Today's Special
						</p>
						<p className="text-base poppins-medium text-[#0A142F] opacity-50 mb-5 lg:mb0">
							Chef's Menu
						</p>
					</div>
					<div className="space-y-3">
						<h1 className="poppins-semibold text-[#0A142F] text-base">
							Explore
						</h1>
						<p className="text-base poppins-medium text-[#0A142F] opacity-50">
							Visit US
						</p>
						<p className="text-base poppins-medium text-[#0A142F] opacity50">
							Contact
						</p>
						<p className="text-base poppins-medium text-[#0A142F] opacity-50">
							E-mail
						</p>
						<p className="text-base poppins-medium text-[#0A142F] opacity-50 mb-5 lg:mb0">
							Address
						</p>
					</div>
					<div className="space-y-3">
						<h1 className="poppins-semibold text-[#0A142F] text-base">Blogs</h1>
						<p className="text-base poppins-medium text-[#0A142F] opacity-50">
							Recent
						</p>
						<p className="text-base poppins-medium text-[#0A142F] opacity-50">
							About US
						</p>
						<p className="text-base poppins-medium text-[#0A142F] opacity-50">
							Book a Table
						</p>
						<p className="text-base poppins-medium text-[#0A142F] opacity-50 mb-5 lg:mb0">
							Free Delivery
						</p>
					</div>
				</div>
				<div className="flex items-center justify-center mb-5">
					<h1 className="text-[#0A142F] poppins-regular text-sm">
						@2024 ABc. ALL rights reserved.
					</h1>
				</div>
			</div>
		</div>
	);
};
export default Footer;
