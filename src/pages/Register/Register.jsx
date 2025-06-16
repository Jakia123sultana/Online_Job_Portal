import Lottie from 'lottie-react';
import React, { use } from 'react';
import register from '../../../src/assets/lotties/register.json';
import { AuthContext } from '../../Contexts/AuthContext';
import SocialLogin from '../Shared/SocialLogin';


const Register = () => {

     const {createUser} = use(AuthContext);


    const handleRegister = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        // create user
        createUser(email, password)
        .then(result =>{
            console.log(result.user)
        })
        .catch(error =>{
            console.log(error)
        })


    } 

    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <div className="text-center lg:text-left">
            <Lottie style={{width: '400px'}} animationData={register}  loop={true} ></Lottie>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
            <h1 className="text-3xl font-bold mb-4 text-blue-800 text-center ">Register now!</h1>
              <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label" >Email</label>
                <input type="email" name="email" className="input input-bordered border border-blue-200" placeholder="Email" />
                <label className="label">Password</label>
                <input type="password" name='password' className="input input-bordered border border-blue-200" placeholder="Password" />
                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn btn-neutral mt-4 bg-blue-800 text-white border-none">Register</button>
              </fieldset>

              </form>
              <SocialLogin/>
             
            </div>
          </div>
        </div>
      </div>
    );
};

export default Register;