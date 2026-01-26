import { useState,useEffect } from 'react';
import Column from './Column';

export default function Board() {
  const [data, setData] = useState({
    wishlist: [],
    applied: [],
    interviewing: [],
    rejected: []
    });
  const [newJob, setNewJob] = useState("");
  const [title, setTitle] = useState("");
  const columnKeys = Object.keys(data);

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(fetchedJobs => {
        // The Reduce Function to sort jobs into columns
        const organizedJobs = fetchedJobs.reduce((acc, job) => {
          // If the status matches one of the columns (e.g., 'wishlist'), add it
          if (acc[job.status]) {
            acc[job.status].push(job);
          }
          return acc;
        }, { wishlist: [], applied: [], interviewing: [], rejected: [] });

        // Update the state with the organized object
        setData(organizedJobs);
      })
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);
  // Function to handle adding a new job
  function handleAddJob() {
    if (!newJob || !title) return;

    fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company: newJob,
        title: title
      })
    })
    .then(res => res.json())
    .then(savedJob => {
      // Add the new job to the 'wishlist' column in our state
      const updatedWishlist = [...data.wishlist, savedJob];
      setData({
        ...data,
        wishlist: updatedWishlist
      });
      // Clear the inputs
      setNewJob("");
      setTitle("");
    });
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
  function handleDrop(jobId, destinationColumn) {
    //Find which column the job is currently in
    const sourceColumn = Object.keys(data).find(key => 
      data[key].find(job => job.id === jobId)
    );
    
    if (!sourceColumn) return; 

    //Get the job object itself
    const jobToMove = data[sourceColumn].find(job => job.id === jobId);

    // Remove it from the old column
    const newSourceList = data[sourceColumn].filter(job => job.id !== jobId);

    // Add it to the new column
    const newDestinationList = [...data[destinationColumn], jobToMove];

    // Update the state
    setData({
      ...data,
      [sourceColumn]: newSourceList,
      [destinationColumn]: newDestinationList
    });
  }
  function handleEditJob(columnKey, jobId, newTitle, newCompany) {
    const columnJobs = data[columnKey];
    
    // Create a new list with the updated job
    const updatedJobs = columnJobs.map((job) => {
      if (job.id === jobId) {
        // Return a copy of the job with new details
        return { ...job, title: newTitle, company: newCompany };
      }
      return job; // Keep other jobs the same
    });

    setData({
      ...data,
      [columnKey]: updatedJobs
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
             onDrop={handleDrop}
             onEdit={handleEditJob}
          />
        ))}
      </div>
    </div>
  );
}