import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import registerAnimation from "../../../src/assets/lotties/register.json";
import { AuthContext } from "../../Contexts/AuthContext";
import SocialLogin from "../Shared/SocialLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    baseURL: "https://career-code-server-with-crud.vercel.app",
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      const imageUrl = res.data.data.url;
      setProfilePic(imageUrl);
      setImageUploading(false);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      setImageUploading(false);
      toast.error("Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile({ displayName: data.name, photoURL: profilePic });

      const userInfo = {
        displayName: data.name,
        photoURL: profilePic,
        email: data.email,
        role: "user",
        contactInfo: data.contactInfo || "",
        joinedDate: new Date().toISOString(),
      };
      await axiosInstance.post("/users", userInfo);

      toast.success("Registration Successful! Welcome aboard 🎉");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 p-4">
        <div className="text-center lg:text-left flex justify-center w-full lg:w-1/2">
          <Lottie
            style={{ width: "100%", maxWidth: "600px", height: "auto" }}
            animationData={registerAnimation}
            loop
          />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold mb-2 text-blue-800 text-center">
              Register now!
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col w-full">
                <label className="label text-blue-800">Your Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full border border-blue-200"
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="flex flex-col w-full">
                <label className="label text-blue-800">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full border border-blue-200"
                  placeholder="Email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col w-full">
                <label className="label text-blue-800">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input file-input-bordered w-full border-blue-200"
                />
                {imageUploading && <p className="text-blue-800 text-sm">Uploading image...</p>}
              </div>

              <div className="flex flex-col w-full">
                <label className="label text-blue-800">Contact Info (optional)</label>
                <input
                  type="text"
                  {...register("contactInfo")}
                  className="input input-bordered w-full border border-blue-200"
                  placeholder="Phone / Social / Address"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="label text-blue-800">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    validate: (value) => /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
                  })}
                  className="input input-bordered w-full border border-blue-200"
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="btn mt-2 bg-blue-800 text-white w-full"
                disabled={imageUploading}
              >
                Register
              </button>
            </form>

            <p className="mt-1 text-center text-blue-800">
              Already have an account?{" "}
              <Link to="/login" className="link link-hover font-semibold">
                Login
              </Link>
            </p>

            <div className="text-center">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;






// import React, {useState} from "react";
// import {useForm} from "react-hook-form";
// import {Link, useNavigate} from "react-router";
// // import SocialLogin from "../SocialLogin/SocialLogin";

// import axios from "axios";
// import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth";
// import useAxios from "../../hooks/useAxios";

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: {errors},
//   } = useForm();
//   const {createUser, updateUserProfile} = useAuth();
//   const axiosInstance = useAxios();
//   const [profilePic, setProfilePic] = useState("");
//   const [imageUploading, setImageUploading] = useState(false);
//   const navigate = useNavigate();
//   const handleImageUpload = async (e) => {
//     const image = e.target.files[0];
//     if (!image) return;

//     setImageUploading(true);

//     const formData = new FormData();
//     formData.append("image", image);

//     const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
//       import.meta.env.VITE_image_upload_key
//     }`;
//     try {
//       const res = await axios.post(imagUploadUrl, formData);
//       const imageUrl = res.data.data.url;
//       setProfilePic(imageUrl);
//       setImageUploading(false);
//       console.log("Image uploaded:", imageUrl);
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       setImageUploading(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       console.log(data.name);
//       const result = await createUser(data.email, data.password);
//       console.log("Firebase user created:", result.user);

//       const userProfile = {
//         displayName: data.name,
//         photoURL: profilePic,
//       };
//       await updateUserProfile(userProfile);
//       console.log("Firebase profile updated");

//       const userInfo = {
//         displayName: data.name,
//         photoURL: profilePic,
//         email: data.email,
//         role: "user",
//         contactInfo: data.contactInfo || "",
//         joinedDate: new Date().toISOString(),
//       };
//       const userRes = await axiosInstance.post("/users", userInfo);

//       await Swal.fire({
//         title: "Registration Successful!",
//         text: "Welcome aboard 🎉",
//         icon: "success",
//         confirmButtonText: "Go to Home",
//       });

//       navigate("/");
//       console.log("User saved in DB:", userRes.data);
//     } catch (error) {
//       console.error("Registration failed:", error);
//       Swal.fire({
//         title: "Oops!",
//         text: error.message || "Registration failed. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   return (
//     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-14 mb-14 mx-auto">
//       <div className="card-body">
//         <h1 className="text-4xl font-bold text-yellow-700">Create Account</h1>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <fieldset className="fieldset space-y-2">
//             <label className="label text-yellow-700">Your Name</label>
//             <input
//               type="text"
//               {...register("name", {required: true})}
//               className="input input-bordered text-yellow-700 border-yellow-700 border-2"
//               placeholder="Your Name"
//             />
//             {errors.name && <p className="text-red-500">Name is required</p>}

//             <label className="label  text-yellow-700 ">Email</label>
//             <input
//               type="email"
//               {...register("email", {required: true})}
//               className="input input-bordered  text-yellow-700 border-yellow-700 border-2"
//               placeholder="Email"
//             />
//             {errors.email && <p className="text-red-500">Email is required</p>}

//             <label className="label text-yellow-700 ">Profile Picture</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="file-input file-input-bordered w-full text-yellow-700 border-yellow-700 border-2"
//             />
//             {imageUploading && (
//               <p className="text-yellow-700">Uploading image...</p>
//             )}

//             <label className="label text-yellow-700">
//               Contact Info (optional)
//             </label>
//             <input
//               type="text"
//               {...register("contactInfo")}
//               className="input input-bordered text-yellow-700 border-yellow-700 border-2"
//               placeholder="Phone / Social / Address"
//             />

//             <label className="label text-yellow-700">Password</label>
//             <input
//               type="password"
//               {...register("password", {
//                 required: true,
//                 minLength: 6,
//                 validate: (value) =>
//                   /[A-Z]/.test(value) ||
//                   "Must contain at least one uppercase letter",
//               })}
//               className="input input-bordered text-yellow-700 border-yellow-700 border-2"
//               placeholder="Password"
//             />
//             {errors.password?.type === "required" && (
//               <p className="text-red-500">Password is required</p>
//             )}
//             {errors.password?.type === "minLength" && (
//               <p className="text-red-500">
//                 Password must be 6 characters or longer
//               </p>
//             )}
//             {errors.password?.message && (
//               <p className="text-red-500">{errors.password.message}</p>
//             )}
//             <button
//               className="btn bg-yellow-700 mt-4 text-white"
//               type="submit"
//               disabled={imageUploading}
//             >
//               Register
//             </button>
//           </fieldset>

//           <p className="mt-2">
//             <small className="text-yellow-700">
//               Already have an account?{" "}
//               <Link className="btn btn-link text-yellow-700" to="/login">
//                 Login
//               </Link>
//             </small>
//           </p>
//         </form>

//         {/* <SocialLogin /> */}
//       </div>
//     </div>
//   );
// };

// export default Register;

