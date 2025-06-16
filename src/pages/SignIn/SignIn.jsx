import React, {use} from "react";

import login from "../../assets/lotties/login.json";
import Lottie from "lottie-react";

import {AuthContext} from "../../Contexts/AuthContext";
import SocialLogin from "../Shared/SocialLogin";

import {FaRProject} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router";

const SignIn = () => {
  const {signInUser} = use(AuthContext);
   const location = useLocation();
 const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
   
    const from = location.state || "/";
    // sign in user
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ml-8">
          <Lottie
            style={{width: "400px"}}
            animationData={login}
            loop={true}
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-blue-800">Sign In now!</h1>
            <form onSubmit={handleSignIn}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4 bg-blue-800 border-none">
                  Sign In
                </button>
              </fieldset>
            </form>
            <div className="text-center">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
