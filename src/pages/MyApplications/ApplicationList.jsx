import { use } from "react";
import JobApplicationRow from "./JobApplicationRow";



export default function ApplictionList({ myApplicationsPromise }) {
   const applications = use(myApplicationsPromise);
  console.log(applications)
   return (
    <div>
          <div>
            <h3 className="text-3xl">Jobs Applied so far: {applications.length}</h3>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((application, index) => <JobApplicationRow
                                key={application._id}
                                index ={index}
                                application={application}
                            ></JobApplicationRow>)
                        }
                    </tbody>
                    
                </table>
            </div>

        </div>
    </div>
  );
}