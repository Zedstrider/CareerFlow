const express = require('express'); 
const router = express.Router(); 
const Job=require('../models/Job');

router.get('/',async(req,res)=>{
     const jobs = await Job.find();
     res.json(jobs);
})

// POST a new job
router.post('/', async (req, res) => {
  // Get the data sent from the frontend
  const { company, title } = req.body;

  //Create a new Job instance
  const newJob = new Job({
    company: company,
    title: title,
    status: 'wishlist' // Default status
  });

  //Save it to the database
  try {
    const savedJob = await newJob.save();
    res.json(savedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req,res)=>{
  const {status}=req.body;
  const jobId=req.params.id;
  try{
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {status: status},
      {new:true}// This option tells Mongoose to return the updated version
    );
    res.json(updatedJob);
  }catch(err){
    res.status(500).json({message:err.message});
  }
});

router.delete('/:id', async(req,res)=>{
  const jobId=req.params.id;
  try{
    await Job.findByIdAndDelete(jobId);
    res.json({message:"Job deleted succesfully"})
  }catch(err){
      res.status(500).json({message:err.message});
  }
} )
module.exports=router;