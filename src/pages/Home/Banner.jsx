import { Link } from "react-router-dom";
import banner from "../../assets/banner.svg";
import banner2 from "../../assets/banner2.svg";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const Banner = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {/* Header Section */}
      <div className="lg:flex items-center space-x-5 p-5">
        <h1 className="lg:text-8xl text-5xl bebas lg:mt-15 mt-10 lg:w-1/2 w-full">
          Tourna / Where Teams Unite
          <br className="block lg:hidden" /> For Battles
        </h1>

        <div className="lg:w-1/2 w-full">
          <p className="liter lg:text-xl">
            At Tourna, we believe tournaments are more than just
            competitions—they're where legends are born. Whether you're an
            organizer crafting epic battles or a competitor hungry for victory,
            we've got the perfect platform for you. From local showdowns to
            championship series, step into a world where every match writes
            history.
          </p>

          {!user ? (
            <Link
              to={"/signup"}
              className="btn bg-black text-white mt-5 roboto w-24 h-12"
            >
              Signup
            </Link>
          ) : (
            <Link
              to={""}
              className="btn bg-white text-black border-black mt-5 roboto w-24 h-12"
            >
              Explore
            </Link>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div className="flex flex-col lg:flex-row items-center gap-5 p-5">
        <img
          className="w-full lg:w-1/2 h-auto object-cover"
          src={banner}
          alt="banner image"
        />
        <img
          className="w-full lg:w-1/2 h-auto object-cover"
          src={banner2}
          alt="second banner image"
        />
      </div>
    </div>
  );
};

export default Banner;
