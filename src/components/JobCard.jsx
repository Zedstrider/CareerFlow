import { useState } from "react";

export default function JobCard({ job,onDelete, onEdit }) {
  function handleDragStart(e, jobId) {
      // This attaches the data to the drag event
      e.dataTransfer.setData("jobId", jobId);
    }
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(job.title || job.position);
  const [editCompany, setEditCompany] = useState(job.company);
  return (
    <div 
      className="bg-white p-4 rounded-md shadow-sm border-2 border-transparent hover:border-blue-500 cursor-grab"
      draggable="true"
      onDragStart={(e) => handleDragStart(e, job._id)}
    >
      {isEditing ? (
        // EDIT MODE
        <div className="flex flex-col gap-2">
           <input 
             className="border p-2 rounded w-full"
             value={editTitle}
             onChange={(e) => setEditTitle(e.target.value)}
           />
           <input 
             className="border p-2 rounded w-full"
             value={editCompany}
             onChange={(e) => setEditCompany(e.target.value)}
           />
           <div className="flex justify-end gap-2">
              <button 
                className="text-gray-500 hover:text-gray-700 text-sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                onClick={() => {
                    onEdit(job._id, editTitle, editCompany);
                    setIsEditing(false);
                }}
              >
                Save
              </button>
           </div>
        </div>
      ) : (
        // VIEW MODE 
        <>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-800">{job.title || job.position}</h3>
            
            <div className="flex gap-2">
               {/* Edit Button*/}
               <button onClick={() => setIsEditing(true)}>✏️</button>
               <button 
                 className="text-gray-300 hover:text-red-500 transition-colors"
                 onClick={() => onDelete(job._id)}
               >
                 🗑️
               </button>
            </div>
          </div>
          <p className="text-gray-500 text-sm">{job.company}</p>
        </>
      )}
    </div>
);
}