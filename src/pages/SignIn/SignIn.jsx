import React, { use } from "react";
import login from "../../assets/lotties/login.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../Contexts/AuthContext";
import SocialLogin from "../Shared/SocialLogin";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const SignIn = () => {
  const { signInUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const from = location.state || "/";
    signInUser(email, password)
      .then(() => {
        toast.success("Login Successful! 🎉");
        navigate(from);
      })
      .catch((error) => {
        toast.error(error.message || "Login Failed");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-6xl">
        {/* Lottie Animation */}
        <div className="flex-1 flex justify-center">
          <Lottie
            className="w-full max-w-[350px] sm:max-w-[400px]"
            animationData={login}
            loop
          />
        </div>

        {/* Form Card */}
        <div className="flex-1 w-full flex justify-center">
          <div className="card bg-base-100 w-full max-w-md shadow-2xl">
            <div className="card-body">
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center">
                Sign In
              </h1>
              <form onSubmit={handleSignIn} className="space-y-3">
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <label className="label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input input-bordered w-full"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="text-right">
                  <a className="link link-hover text-sm">Forgot password?</a>
                </div>
                <button className="btn btn-neutral w-full bg-blue-800 border-none">
                  Sign In
                </button>
              </form>

              {/* Social Login */}
              <div className="mt-4">
                <SocialLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
