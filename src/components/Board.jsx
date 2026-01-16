import { useState,useEffect } from 'react';
import initialData from '../data/initialData';
import Column from './Column';

export default function Board() {
// Initialize state with starting data
  const [data, setData] = useState(()=>{
    if(localStorage["jobTrackerData"])
      return JSON.parse(localStorage["jobTrackerData"]);
    else 
      return initialData;
    });
  const [newJob, setNewJob] = useState("");
  const [title, setTitle] = useState("");
  const columnKeys = Object.keys(data);

  useEffect(()=>{
    localStorage.setItem("jobTrackerData", JSON.stringify(data));
  },[data]);
  // Function to handle adding a new job
  function handleAddJob() {
    if (!newJob || !title) return;
    const newJobItem = {
      id: Date.now(), // Simple unique ID
      company: newJob,
      title: title,
      type: 'wishlist' // Default to the first column
    };
    const updatedWishlist = [...data.wishlist, newJobItem];
    setData({
      ...data,
      wishlist: updatedWishlist
    });
    // Clear inputs after adding
    setNewJob("");
    setTitle("");
  }
  function handleDelete(columnKey, jobId) {
    // Get the current list for this column
    const currentList = data[columnKey];
    // Create a new list that keeps everything EXCEPT the matching jobId
    const newList = currentList.filter((job) => job.id!=jobId );
    setData({
    ...data,
    [columnKey]:newList
    });
 }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">CareerFlow 🌊</h1>
      {/* The "Create" Form */}
      <div className="flex space-x-2 mb-8">
        <input 
          type="text" 
          placeholder="Company" 
          className="border p-2 rounded w-full" 
          value={newJob}
          onChange={(e) => setNewJob(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Title" 
          className="border p-2 rounded w-full" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600"
          onClick={handleAddJob}
        >
          Add
        </button>

      </div>
      {/*The Board Columns */}
      <div className="grid grid-cols-4 gap-4">
        {columnKeys.map((key) => (
          <Column 
             key={key} 
             title={key} 
             jobs={data[key]} 
             onDelete={(jobId) => handleDelete(key,jobId)}
          />
        ))}
      </div>
    </div>
  );
}