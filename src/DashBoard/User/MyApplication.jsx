import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

export default function MyApplication() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  console.log(applications);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/applications?email=${user.email}`)
        .then((res) => {
          setApplications(res.data);
        })
        .catch((err) => {
          console.error("Failed to load applications:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [axiosSecure, user?.email]);

  if (loading) {
    return <div className="text-center py-10">Loading your applications...</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-3xl mb-4">Jobs Applied: {applications.length}</h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Job Title</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application._id}>
                <td>{index + 1}</td>
                <td className="flex items-center gap-3">
                  <img
                    src={application.company_logo}
                    className="w-10 h-10 object-cover rounded"
                    alt="Company Logo"
                  />
                  <div>
                    <div className="font-semibold">{application.company}</div>
                    <div className="text-sm opacity-50">{application.location}</div>
                  </div>
                </td>
                <td>{application.title}</td>
                <td>
                  <span className="badge badge-info">
                    {application.status || "Pending"}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
