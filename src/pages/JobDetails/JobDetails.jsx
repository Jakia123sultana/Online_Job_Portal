import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router'; // ✅ Fixed incorrect import
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ImSpinner9 } from "react-icons/im"; // ✅ Using new spinner

const JobDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  console.log(job)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosSecure.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, axiosSecure]);

   if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <ImSpinner9 className="animate-spin text-4xl text-yellow-600" />
      </div>
    );
  }

  if (!job) {
    return <div className="text-center text-red-500 my-10">Job not found</div>;
  }

  const { _id, title, company, description, location, salary } = job;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-4xl font-bold mb-2">{title}</h2>
      <p className="text-lg mb-2"><strong>Company:</strong> {company}</p>
      <p className="mb-2"><strong>Location:</strong> {location}</p>
      <p className="mb-2"><strong>Salary:</strong> ${salary}</p>
      <p className="mb-4"><strong>Description:</strong> {description}</p>
      <Link to={`/jobApply/${_id}`}>
        <button className="btn btn-primary">Apply Now</button>
      </Link>
    </div>
  );
};

export default JobDetails;
