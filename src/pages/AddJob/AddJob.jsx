import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AddJob() {
    const {user} = useAuth();
    const axiosInstance = useAxiosSecure();
  const handleAddAJob = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Transform comma-separated text into arrays
  const requirements = data.requirements?.split(",").map(r => r.trim()) || [];
  const responsibilities = data.responsibilities?.split(",").map(r => r.trim()) || [];

  const jobData = {
    title: data.title,
    company: data.company,
    company_logo: data.company_logo,
    location: data.location,
    jobType: data.jobType,
    category: data.category,
    applicationDeadline: data.deadline,
    description: data.description,
    salaryRange: {
      min: data.min,
      max: data.max,
      currency: data.currency,
    },
    requirements,
    responsibilities,
    hr_name: data.hr_name,
    hr_email: user?.email || data.hr_email,
    status: "active", // OR use "unverified" if admins should verify
    createdAt: new Date(),
    postedBy: user?.email
  };

  try {
    const res = await axiosInstance.post("/jobs", jobData);
    if (res.data.insertedId) {
      Swal.fire("Success!", "Job posted and awaiting verification.", "success");
      form.reset();
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Failed to post job", "error");
  }
};


  return (
    <div className="p-4">
      {/* <h2 className="text-3xl  text-white font-bold mb-6 text-center">Please add a job</h2> */}

      <form
        onSubmit={handleAddAJob}
        className="max-w-4xl mx-auto p-6 space-y-6 bg-base-100 rounded-lg shadow"
      >
        {/* Basic Info */}
        {/* <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                    <legend className="text-lg font-bold mb-2">Basic Info</legend> */}

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 relative">
          <legend className="sr-only">Basic Info</legend>
          
          <h2 className="text-lg font-bold  mb-4">Basic Info</h2>
          <label className="label font-semibold text-lg">Job Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            placeholder="Job Title"
          />
          <label className="label font-semibold text-lg">Company</label>
          <input
            type="text"
            name="company"
            className="input input-bordered w-full"
            placeholder="Company Name"
          />
          <label className="label font-semibold text-lg">Location</label>
          <input
            type="text"
            name="location"
            className="input input-bordered w-full"
            placeholder="Company Location"
          />
          <label className="label font-semibold text-lg">Company logo</label>
          <input
            type="text"
            name="company_logo"
            className="input input-bordered w-full"
            placeholder="Company Logo URL"
          />
        </fieldset>

        {/* Job Type */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="sr-only ">Job Type</legend>
          <h2 className="text-lg font-bold  mb-2">Job Type</h2>

          <div className="flex flex-wrap gap-2">
            <input
              className="btn btn-outline"
              type="radio"
              name="jobType"
              aria-label="All"
            />
            <input
              className="btn btn-outline"
              type="radio"
              name="jobType"
              value="On-Site"
              aria-label="On-Site"
            />
            <input
              className="btn btn-outline"
              type="radio"
              name="jobType"
              value="Remote"
              aria-label="Remote"
            />
            <input
              className="btn btn-outline"
              type="radio"
              name="jobType"
              value="Hybrid"
              aria-label="Hybrid"
            />
          </div>
        </fieldset>

        {/* Job Category */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="sr-only">Job Category</legend>
           <h2 className="text-lg font-bold  mb-2">Job Category</h2>
          

          <select
            defaultValue="Job Category"
            name="category"
            className="select select-bordered w-full"
          >
            <option disabled={true}>Job Category</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Finance</option>
          </select>
        </fieldset>

        {/* Application Deadline */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="sr-only">
            
            Application Deadline
          </legend>
          <h2 className="text-lg font-bold  mb-2">Application Deadline</h2>

          <input
            type="date"
            name="deadline"
            className="input input-bordered w-full"
          />
        </fieldset>

        {/* Salary Range */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="sr-only">Salary Range</legend>
          <h2 className="text-lg font-bold  mb-2">Salary Range</h2>
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="label font-semibold text-lg">
                Minimum Salary
              </label>
              <input
                type="text"
                name="min"
                className="input input-bordered w-full"
                placeholder="Minimum Salary"
              />
            </div>

            <div>
              <label className="label font-semibold text-lg">
                Maximum Salary
              </label>
              <input
                type="text"
                name="max"
                className="input input-bordered w-full"
                placeholder="Maximum Salary"
              />
            </div>

            <div>
              <label className="label font-semibold text-lg">Currency</label>
              <select
                defaultValue="Select a Currency"
                name="currency"
                className="select select-bordered w-full"
              >
                <option disabled={true}>Select a Currency</option>
                <option>BDT</option>
                <option>USD</option>
                <option>EU</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Job Description  */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="sr-only">Job Description</legend>
          <h2 className="text-lg font-bold  mb-2">Job Description</h2>
          <textarea
            className="textarea textarea-bordered w-full"
            name="description"
            placeholder="Job Description"
          ></textarea>
        </fieldset>

        {/* Job Requirements  */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="sr-only">Job Requirements</legend>
          <h2 className="text-lg font-bold  mb-2">Job Requirements</h2>
          <textarea
            className="textarea textarea-bordered w-full"
            name="requirements"
            placeholder="Requirements (separate by comma)"
          ></textarea>
        </fieldset>

        {/* Job Responsibilities  */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="sr-only">
            Job Responsibilities
          </legend>
           <h2 className="text-lg font-bold  mb-2">Job Responsibilities</h2>
          <textarea
            className="textarea textarea-bordered w-full"
            name="responsibilities"
            placeholder="Responsibilities (separate by comma)"
          ></textarea>
        </fieldset>

        {/* HR Info */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="sr-only">HR Related Info</legend>
           <h2 className="text-lg font-bold  mb-2">HR Related Info</h2>

          <label className="label font-semibold text-lg">HR Name</label>
          <input
            type="text"
            name="hr_name"
            className="input input-bordered w-full"
            placeholder="HR Name"
          />

          <label className="label font-semibold text-lg">HR Email</label>
          <input type="email" name='hr_email' defaultValue={user.email} className="input input-bordered w-full" placeholder="HR Email" />
        </fieldset>

        <input
          type="submit"
          className="btn btn-primary w-full"
          value="Add Job"
        />
      </form>
    </div>
  );
}