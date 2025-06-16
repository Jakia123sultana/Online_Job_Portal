import { use } from "react";
import { useParams,Link } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function JobApply() {
  const {id:jobId} = useParams();
  const {user}=use(AuthContext);

  console.log(jobId,user)

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
        }
         axios.post('http://localhost:3000/applications', application)
            .then(res => {
                console.log(res.data)
                if(res.data.insertedId){
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
                console.log(error)
            })
 }
  return (
    <>
      <div>
            <h3 className="text-4xl">Apply for this job:<Link to={`/jobs/${jobId}`}>details</Link> </h3>
            <form onSubmit={handleApplyFormSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <label className="label">LinkedIn Link</label>
                    <input type="url" name="linkedIn" className="input" placeholder="LinkedIn profile link" />

                    <label className="label">Github Link</label>
                    <input type="url" name="github" className="input" placeholder="Github Link" />

                    <label className="label">Resume Link</label>
                    <input type="url" name="resume" className="input" placeholder="Resume Link" />

                    <input type="submit" className='btn' value="Apply" />

                </fieldset>
            </form>
        </div>
    </>
  );
}