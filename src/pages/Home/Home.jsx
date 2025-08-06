import { Suspense } from "react";
import HotJobs from "./HotJobs";
import Banner from "./Banner";
import TestimonialsSection from "./TestimonialsSection";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Home() {
    const axiosInstance = useAxiosSecure();
const jobsPromise = axiosInstance
  .get("/jobs")
  .then((res) => res.data.filter((job) => job.status === "Verified")); // ✅ filter verified only


    return (
        <div>
            <Banner></Banner>
            <TestimonialsSection/>
            <Suspense fallback={'Loading hot jobs'}>
                <HotJobs jobsPromise={jobsPromise}></HotJobs>
            </Suspense>
        </div>
    );
}