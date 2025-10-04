/* eslint-disable no-unused-vars */
import img from "../../assets/signup.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const onSubmit = (data) => {
    fetch("https://project-tourna-server.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          navigate("/");
          window.location.reload();
          localStorage.setItem("user", JSON.stringify(data.data));
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        toast.error("An error occurred, try again later.");
        console.log(err);
      });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="flex justify-between items-center max-lg:flex-col" ref={ref}>
      <motion.div
        className="flex-1"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <img className="w-full h-full" src={img} alt="" />
      </motion.div>
      <motion.div
        className="flex-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-sm:px-10 sm:max-w-3/4 mx-auto">
          <motion.h1 variants={itemVariants} className="bebas text-4xl md:text-7xl">
            Your gateway to the journey
          </motion.h1>
          <motion.p variants={itemVariants} className="anton max-sm:text-sm mb-5 sm:mb-10">
            Ready to embark your next tournament? Log in now and let the MKS
            manage you there. Your dream tournament is just a click away !{" "}
          </motion.p>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="anton flex flex-col gap-5"
            variants={containerVariants}
          >
            <motion.label
              className="input validator w-full"
              variants={itemVariants}
            >
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                required
                {...register("email")}
              />
            </motion.label>
            <motion.div
              className="validator-hint hidden"
              variants={itemVariants}
            >
              Enter valid email address
            </motion.div>

            <motion.label
              className="input validator w-full"
              variants={itemVariants}
            >
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                {...register("password")}
              />
            </motion.label>
            <motion.p className="validator-hint hidden" variants={itemVariants}>
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </motion.p>
            <motion.button
              className="btn btn-block"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </motion.form>
          <motion.div className="divider" variants={itemVariants}>
            or
          </motion.div>
          <motion.p className="anton text-center" variants={itemVariants}>
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="underline">Signup now.</span>
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
