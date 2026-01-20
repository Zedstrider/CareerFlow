import JobCard from "./JobCard";

export default function Column({ title, jobs, onDelete, onDrop, onEdit }) {
  function handleDragOver(e) {
  e.preventDefault(); // This says "Allow dropping here!"
  }
  function handleDropEvent(e) {
    e.preventDefault();
    // Get the ID stored on the "sticky note"
    const jobId = Number(e.dataTransfer.getData("jobId")); 
    // Call the Board's function
    onDrop(jobId, title);
  }
  return (
    // Container for the column
    <div className="w-80 bg-gray-200 rounded-lg p-4 mr-4" 
    onDragOver={handleDragOver} onDrop={handleDropEvent}>
      {/* Column Title */}
      <h2 className="font-bold text-lg mb-4 text-gray-700">
        {title} ({jobs.length})
      </h2>

      {/* The List of Jobs */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <JobCard 
            key={job.id} 
            job={job} 
            onDelete={onDelete} 
            onEdit={(jobId, newTitle, newCompany) => onEdit(title, jobId, newTitle, newCompany)}/>
        ))}
      </div>
    </div>
  );
}