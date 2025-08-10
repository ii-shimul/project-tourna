import React from "react";
import img from "../../assets/login.svg";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">
        <img className="w-full h-full" src={img} alt="" />
      </div>
      <div className="flex-1">
        <div className="max-w-3/4 mx-auto">
          <h1 className="bebas text-7xl">
            You're going to love every bit of it
          </h1>
          <p className="anton mb-10">
            Ready to embark your next tournament? Signup now and let the MKS
            manage you there. Your dream tournament is just a click away !{" "}
          </p>
          <form action="" className="anton flex flex-col gap-5">
            <label className="input validator w-full">
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
              <input type="email" placeholder="mail@site.com" required />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>

            <label className="input validator w-full">
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
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
            <button class="btn btn-block">Signup</button>
          </form>
          <div className="divider">or</div>
          <p className="anton text-center">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="underline">Login now.</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
