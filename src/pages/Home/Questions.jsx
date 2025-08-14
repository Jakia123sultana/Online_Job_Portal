import React from "react";
import { FiCheck } from "react-icons/fi";

export default function Questions() {
  return (
    <section className="max-w-4xl mx-auto p-6 rounded-lg shadow-md text-white">
      <h2 className="text-3xl font-bold mb-6 text-white">
        At JobFinder, your career is our priority.  
      </h2>

      <ul className="space-y-6 text-white">
        <li className="flex items-start gap-4">
          <FiCheck className="text-[#00CED1] mt-1" size={44} />
          <div>
            <h3 className="font-semibold text-lg text-white">
              Tailored Job Recommendations
            </h3>
            <p className="opacity-60">
              Find jobs that fit your skills and preferences with our smart matching system.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-4">
          <FiCheck className="text-[#00CED1] mt-1" size={44} />
          <div>
            <h3 className="font-semibold text-lg text-white">
              Verified Employers & Listings
            </h3>
            <p className="opacity-60">
              We ensure all job listings are genuine and posted by trusted companies.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-4">
          <FiCheck className="text-[#00CED1] mt-1" size={44} />
          <div>
            <h3 className="font-semibold text-lg text-white">
              Career Growth Tools
            </h3>
            <p className="opacity-60">
              Use our tools to track your applications, get interview tips, and enhance your resume.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
}
