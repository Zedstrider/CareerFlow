import JobCard from "./JobCard";

export default function Column({ title, jobs, onDelete }) {
  return (
    // Container for the column
    <div className="w-80 bg-gray-200 rounded-lg p-4 mr-4">
      
      {/* Column Title */}
      <h2 className="font-bold text-lg mb-4 text-gray-700">
        {title} ({jobs.length})
      </h2>

      {/* The List of Jobs */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}