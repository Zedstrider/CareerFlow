export default function JobCard({ job,onDelete }) {
  function handleDragStart(e, jobId) {
      // This attaches the data to the drag event
      e.dataTransfer.setData("jobId", jobId);
    }
  return (
    // Card Container
    <div className="bg-white p-4 rounded-md shadow-sm border-2 border-transparent hover:border-blue-500 cursor-grab" 
    draggable="true" onDragStart={(e) => handleDragStart(e, job.id)}>
      <div className="flex justify-between items-start">
        {/* Job Position */}
        <h3 className="font-bold text-gray-800">{job.title || job.position}</h3>
        <button className="text-gray-300 hover:text-red-500 transition-colors"
          onClick={()=>onDelete(job.id)}>
        🗑️
        </button>
        </div>
        {/* Company Name */}
        <p className="text-gray-500 text-sm">{job.company}</p>
    </div>
  );
}