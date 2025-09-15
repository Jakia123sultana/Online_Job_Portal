// import { use } from "react";
// import { useParams, Link } from "react-router";
// import { AuthContext } from "../../Contexts/AuthContext";
// import axios from "axios";
// import Swal from "sweetalert2";

// export default function JobApply() {
//   const { id: jobId } = useParams();
//   const { user } = use(AuthContext);

//   console.log(jobId, user);

//   const handleApplyFormSubmit = e => {
//     e.preventDefault();
//     const form = e.target;
//     const linkedIn = form.linkedIn.value;
//     const github = form.github.value;
//     const resume = form.resume.value;

//     console.log(linkedIn, github, resume);

//     const application = {
//       jobId,
//       applicant: user.email,
//       linkedIn,
//       github,
//       resume
//     };

//     axios.post('https://career-code-server-with-crud.vercel.app/applications', application)
//       .then(res => {
//         console.log(res.data);
//         if (res.data.insertedId) {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "Your application has been submitted",
//             showConfirmButton: false,
//             timer: 1500
//           });
//         }
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   return (
//     <>
//       <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
//         <h3 className="text-3xl font-semibold mb-6 text-center">
//           Apply for this job.
//         </h3>
//         <form onSubmit={handleApplyFormSubmit} className="space-y-4">
//           <fieldset className="space-y-4">
//             <div className="form-control">
//               <label className="label font-medium">LinkedIn Link</label>
//               <input
//                 type="url"
//                 name="linkedIn"
//                 className="input input-bordered w-full"
//                 placeholder="LinkedIn profile link"
//                 required
//               />
//             </div>

//             <div className="form-control">
//               <label className="label font-medium">Github Link</label>
//               <input
//                 type="url"
//                 name="github"
//                 className="input input-bordered w-full"
//                 placeholder="Github profile link"
//                 required
//               />
//             </div>

//             <div className="form-control">
//               <label className="label font-medium">Resume Link</label>
//               <input
//                 type="url"
//                 name="resume"
//                 className="input input-bordered w-full"
//                 placeholder="Resume link"
//                 required
//               />
//             </div>

//             <input type="submit" className="btn btn-primary w-full" value="Apply" />
//           </fieldset>
//         </form>
//       </div>
//     </>
//   );
// }
import { useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function JobApply() {
  const { id: jobId } = useParams();
  const { user } = useContext(AuthContext);

  const [profilePic, setProfilePic] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  // Image upload handler
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

  // Form submit handler
  const handleApplyFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedIn = form.linkedIn.value;
    const github = form.github.value;
    const resume = form.resume.value;

    if (!profilePic) {
      Swal.fire({
        icon: "warning",
        title: "Please upload your profile picture",
      });
      return;
    }

    const application = {
      jobId,
      applicant: user.email,
      name: user.displayName || user.name || "No Name", // Add user name here
      profilePic, // Add profile picture
      linkedIn,
      github,
      resume
    };

    try {
      // Check if user already applied for this job
      const existingRes = await axios.get(
        `https://career-code-server-with-crud.vercel.app/applications?email=${user.email}`
      );

      const alreadyApplied = existingRes.data.some(app => app.jobId === jobId);

      if (alreadyApplied) {
        Swal.fire({
          icon: "warning",
          title: "You have already applied for this job",
          showConfirmButton: true
        });
        return;
      }

      // Submit application
      const res = await axios.post(
        "https://career-code-server-with-crud.vercel.app/applications",
        application
      );

      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application has been submitted",
          showConfirmButton: false,
          timer: 1500
        });
        form.reset();
        setProfilePic("");
      }

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err.message
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10 mb-10">
      <h3 className="text-3xl font-semibold mb-6 text-center">
        Apply for this job
      </h3>

      <form onSubmit={handleApplyFormSubmit} className="space-y-4">
        {/* Profile Picture */}
       <div className="form-control">
  <label htmlFor="profilePicture" className="label font-medium">
    <span className="label-text">Profile Picture</span>
  </label>
  <input
    id="profilePicture"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="file-input file-input-bordered w-full border-2"
    required
  />
  {imageUploading && (
    <p className="text-sm text-gray-600 mt-1">Uploading image...</p>
  )}
</div>


        {/* LinkedIn */}
        <div className="form-control">
          <label className="label font-medium">LinkedIn Link</label>
          <input
            type="url"
            name="linkedIn"
            className="input input-bordered w-full"
            placeholder="LinkedIn profile link"
            required
          />
        </div>

        {/* Github */}
        <div className="form-control">
          <label className="label font-medium">Github Link</label>
          <input
            type="url"
            name="github"
            className="input input-bordered w-full"
            placeholder="Github profile link"
            required
          />
        </div>

        {/* Resume */}
        <div className="form-control">
          <label className="label font-medium">Resume Link</label>
          <input
            type="url"
            name="resume"
            className="input input-bordered w-full"
            placeholder="Resume link"
            required
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary w-full"
          value="Apply"
        />
      </form>
    </div>
  );
}
