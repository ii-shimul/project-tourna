import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
	return (
		<div>
			<div className="lg:flex justify-between lg:p-5 p-5 mt-25 mb-5 border-b-2  ">
				<div>
					<h1 className="bebas text-xl">Tourna</h1>
					<p className="roboto font-bold">Sylhet, Bangladesh</p>
					<p className="roboto font-bold mt-10">Contact :</p>
					<p className="roboto font-bold underline">017 0000 0000</p>
					<p className="roboto font-bold underline">info@tourna.com</p>
					<div className="flex space-x-3 mt-5 lg:mb-0 mb-10">
						<p className="text-3xl">
							<FaFacebook />
						</p>
						<p className="text-3xl">
							<FaSquareInstagram />
						</p>
						<p className="text-3xl">
							<BsTwitterX />
						</p>
						<p className="text-3xl">
							<IoLogoLinkedin />
						</p>
						<p className="text-3xl">
							<FaYoutube />
						</p>
					</div>
				</div>
				<div className="lg:flex gap-10">
					<div className="space-y-3">
						<p className="roboto font-bold ">Contact Us</p>
						<p className="roboto font-bold">Join newsletter</p>
						<p className="roboto font-bold ">Support Us</p>
						<p className="roboto font-bold ">Social Media</p>
						<p className="roboto font-bold ">Visit Store</p>
					</div>
				</div>
			</div>
			<div className="lg:flex justify-between roboto font-semibold mb-5 p-5 ">
				<h1 className="mb-5 lg:mb-0">@ 2025 Tourna. All rights reserved.</h1>
				<div className="lg:flex lg:space-x-3 space-y-3">
					<p className="underline">Privacy Policy</p>
					<p className="underline">Terms of Service</p>
					<p className="underline">Cookies Settings</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
