export default function JobCard({ job }) {
  return (
    // Card Container
    <div className="bg-white p-4 rounded-md shadow-sm border-2 border-transparent hover:border-blue-500 cursor-grab">
      
      {/* Job Position */}
      <h3 className="font-bold text-gray-800">{job.position}</h3>
      
      {/* Company Name */}
      <p className="text-gray-500 text-sm">{job.company}</p>
      
    </div>
  );
}