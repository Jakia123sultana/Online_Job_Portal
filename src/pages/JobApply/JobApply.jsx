import { use } from "react";
import { useParams, Link } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function JobApply() {
  const { id: jobId } = useParams();
  const { user } = use(AuthContext);

  console.log(jobId, user);

  const handleApplyFormSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const linkedIn = form.linkedIn.value;
    const github = form.github.value;
    const resume = form.resume.value;

    console.log(linkedIn, github, resume);

    const application = {
      jobId,
      applicant: user.email,
      linkedIn,
      github,
      resume
    };

    axios.post('https://career-code-server-with-crud.vercel.app/applications', application)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your application has been submitted",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
        <h3 className="text-3xl font-semibold mb-6 text-center">
          Apply for this job.
        </h3>
        <form onSubmit={handleApplyFormSubmit} className="space-y-4">
          <fieldset className="space-y-4">
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

            <input type="submit" className="btn btn-primary w-full" value="Apply" />
          </fieldset>
        </form>
      </div>
    </>
  );
}