import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';

const ApplicantTable = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const applicants = [
    {
      id: '#API~0003',
      dateApplied: 'June 1, 2020, 08:22 AM',
      company: 'Moseiski Inc.',
      type: 'Creative Design Agency',
      position: 'FREELANCE',
      contact: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        cv: 'https://example.com/johndoe_cv.pdf'
      },
      status: 'Pending'
    },
    {
      id: '#API~0002',
      dateApplied: 'June 1, 2020, 08:22 AM',
      company: 'Funk Inc.',
      type: 'IT Department',
      position: 'PART TIME',
      contact: {
        github: 'https://github.com/janedoe',
        linkedin: 'https://linkedin.com/in/janedoe',
        cv: 'https://example.com/janedoe_cv.pdf'
      },
      status: 'On-Hold'
    }
  ];

  const filters = ['All', 'Pending', 'On-Hold', 'Candidate'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-700 text-white';
      case 'On-Hold':
        return 'bg-purple-700 text-white';
      case 'Candidate':
        return 'bg-green-700 text-white';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1e2f] p-6">
      <div className="bg-[#0f1e2f] rounded-2xl border border-[#1b3147] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1b3147] flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-white">Showing 45 Applicants</h2>
            <p className="text-sm text-gray-400">Based on your preferences</p>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-3 border-b border-[#1b3147] flex space-x-4">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeFilter === filter
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-400 hover:bg-[#1b3147]'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead>
              <tr className="bg-[#1b3147] uppercase tracking-wider text-gray-300">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Date Applied</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b3147]">
              {applicants.map((applicant, index) => (
                <tr key={index} className="hover:bg-[#1b3147]">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{applicant.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">{applicant.dateApplied}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{applicant.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">{applicant.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">{applicant.position}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
  {/* GitHub */}
  <a
    href={applicant.contact.github}
    target="_blank"
    rel="noopener noreferrer"
    className="p-1 rounded border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"
  >
    <FaGithub size={14} />
  </a>
  
  {/* LinkedIn */}
  <a
    href={applicant.contact.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    className="p-1 rounded border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"
  >
    <FaLinkedin size={14} />
  </a>
  
  {/* CV */}
  <a
    href={applicant.contact.cv}
    target="_blank"
    rel="noopener noreferrer"
    className="p-1 rounded border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"
  >
    <FaFileAlt size={14} />
  </a>
</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        applicant.status
                      )}`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1b3147] flex justify-between items-center text-gray-400">
          <p className="text-sm">Showing 10 from 180 data</p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#1b3147]">Previous</button>
            <button className="px-3 py-1 rounded bg-blue-700 text-white text-sm font-medium">1</button>
            <button className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#1b3147]">2</button>
            <button className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#1b3147]">3</button>
            <button className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#1b3147]">Next</button>
          </div>
          <p className="text-sm">Activate Windows<br />Go to Settings to activate</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantTable;
