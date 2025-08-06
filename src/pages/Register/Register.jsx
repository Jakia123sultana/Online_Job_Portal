// import Lottie from 'lottie-react';
// import React, { use } from 'react';
// import register from '../../../src/assets/lotties/register.json';
// import { AuthContext } from '../../Contexts/AuthContext';
// import SocialLogin from '../Shared/SocialLogin';


// const Register = () => {

//      const {createUser} = use(AuthContext);


//     const handleRegister = e =>{
//         e.preventDefault();
//         const form = e.target;
//         const email = form.email.value;
//         const password = form.password.value;
//         console.log(email, password)

//         // create user
//         createUser(email, password)
//         .then(result =>{
//             console.log(result.user)
//         })
//         .catch(error =>{
//             console.log(error)
//         })


//     } 

//     return (
//         <div className="hero bg-base-200 min-h-screen">
//         <div className="hero-content flex-col lg:flex-row-reverse gap-10">
//           <div className="text-center lg:text-left">
//             <Lottie style={{width: '400px'}} animationData={register}  loop={true} ></Lottie>
//           </div>
//           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//             <div className="card-body">
//             <h1 className="text-3xl font-bold mb-4 text-blue-800 text-center ">Register now!</h1>
//               <form onSubmit={handleRegister}>
//               <fieldset className="fieldset">
//                 <label className="label" >Email</label>
//                 <input type="email" name="email" className="input input-bordered border border-blue-200" placeholder="Email" />
//                 <label className="label">Password</label>
//                 <input type="password" name='password' className="input input-bordered border border-blue-200" placeholder="Password" />
//                 <div><a className="link link-hover">Forgot password?</a></div>
//                 <button className="btn btn-neutral mt-4 bg-blue-800 text-white border-none">Register</button>
//               </fieldset>

//               </form>
//               <SocialLogin/>
             
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// };

// export default Register;


import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router";
// import SocialLogin from "../SocialLogin/SocialLogin";

import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {createUser, updateUserProfile} = useAuth();
  const axiosInstance = useAxios();
  const [profilePic, setProfilePic] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const navigate = useNavigate();
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setImageUploading(true);

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    try {
      const res = await axios.post(imagUploadUrl, formData);
      const imageUrl = res.data.data.url;
      setProfilePic(imageUrl);
      setImageUploading(false);
      console.log("Image uploaded:", imageUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
      setImageUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log(data.name);
      const result = await createUser(data.email, data.password);
      console.log("Firebase user created:", result.user);

      const userProfile = {
        displayName: data.name,
        photoURL: profilePic,
      };
      await updateUserProfile(userProfile);
      console.log("Firebase profile updated");

      const userInfo = {
        displayName: data.name,
        photoURL: profilePic,
        email: data.email,
        role: "user",
        contactInfo: data.contactInfo || "",
        joinedDate: new Date().toISOString(),
      };
      const userRes = await axiosInstance.post("/users", userInfo);

      await Swal.fire({
        title: "Registration Successful!",
        text: "Welcome aboard 🎉",
        icon: "success",
        confirmButtonText: "Go to Home",
      });

      navigate("/");
      console.log("User saved in DB:", userRes.data);
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        title: "Oops!",
        text: error.message || "Registration failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-14 mb-14 mx-auto">
      <div className="card-body">
        <h1 className="text-4xl font-bold text-yellow-700">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset space-y-2">
            <label className="label text-yellow-700">Your Name</label>
            <input
              type="text"
              {...register("name", {required: true})}
              className="input input-bordered text-yellow-700 border-yellow-700 border-2"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500">Name is required</p>}

            <label className="label  text-yellow-700 ">Email</label>
            <input
              type="email"
              {...register("email", {required: true})}
              className="input input-bordered  text-yellow-700 border-yellow-700 border-2"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <label className="label text-yellow-700 ">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full text-yellow-700 border-yellow-700 border-2"
            />
            {imageUploading && (
              <p className="text-yellow-700">Uploading image...</p>
            )}

            <label className="label text-yellow-700">
              Contact Info (optional)
            </label>
            <input
              type="text"
              {...register("contactInfo")}
              className="input input-bordered text-yellow-700 border-yellow-700 border-2"
              placeholder="Phone / Social / Address"
            />

            <label className="label text-yellow-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                validate: (value) =>
                  /[A-Z]/.test(value) ||
                  "Must contain at least one uppercase letter",
              })}
              className="input input-bordered text-yellow-700 border-yellow-700 border-2"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.message && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <button
              className="btn bg-yellow-700 mt-4 text-white"
              type="submit"
              disabled={imageUploading}
            >
              Register
            </button>
          </fieldset>

          <p className="mt-2">
            <small className="text-yellow-700">
              Already have an account?{" "}
              <Link className="btn btn-link text-yellow-700" to="/login">
                Login
              </Link>
            </small>
          </p>
        </form>

        {/* <SocialLogin /> */}
      </div>
    </div>
  );
};

export default Register;

