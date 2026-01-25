const express = require('express'); 
const router = express.Router(); 
const job=require('../models/Job');

router.get('/',async(req,res)=>{
     const jobs = await job.find();
     res.json(jobs);
})

module.exports=router;