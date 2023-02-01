const { response } = require("express");
const { findByIdAndDelete, findByIdAndUpdate } = require("../models/tasks");
const Tasks = require("../models/tasks");


const getallTasks =async(req,res)=>{
    try {
        const tasks = await Tasks.find()
        res.status(200).json({numoftasks:tasks.length,tasks})
    } catch (error) {
      res.status(500).json({message: error})  
    }   
}

//get a single task
const getSingleTask = async(req,res)=>{
try {
const {taskId}=req.params
const task = await Tasks.findOne({ _id:taskId });
    if(!task){
        return res.status(404).json({message: 'Task with the id :${taskId} not found'})
    }
    res.status(200).json({task})
    
} catch (error) {

     res.status(500).json({message: error})
}
}

//create task
const createTask = async(req,res)=>{
  try {
    const {title,priority}=req.body
    if(!title || !priority){
        return res.status(400).json({message:"please provide neccesary information"});

    }
    const task = await Tasks.create(req.body)
    res.status(201).json({msg:"tasks created successfully",task})
  } catch (error) {
    res.status(500).json({message: error})
  }
}

//update task
const updateTask = async(req,res)=>{
    const {taskId}=req.params
   
   try {
    const task =await Tasks.findByIdAndUpdate({_id: taskId},req.body,{new:true,runValidators:true,})
    if (!task) {
        return res.status(404).json({message: 'Task not found'})
    }
    res.status(200).json({message:'updated successfully', task})
   } catch (error) {
    res.status(500).json({message: error})
   }
}

//delete task
const deleteTask = async(req,res)=>{
    const {taskId} = req.params
try {
    
    const task = await Tasks.findByIdAndDelete({_id:taskId }) ;
    if(!task){
        return res.status(404).json({message: 'Task with the id :${taskId} is not deleted'})
    }
        res.status(200).json({message:"deleted",task})
      
} catch (error) {
    res.status(500).json({message: error})
    
}
};





module.exports = {
    getallTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,

}