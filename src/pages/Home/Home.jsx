import { Suspense } from "react";
import HotJobs from "./HotJobs";

export default function Home() {
    const jobsPromise = fetch('http://localhost:3000/jobs').then(res => res.json())

    return (
        <div>
            {/* <Banner></Banner> */}
            <Suspense fallback={'Loading hot jobs'}>
                <HotJobs jobsPromise={jobsPromise}></HotJobs>
            </Suspense>
        </div>
    );
}