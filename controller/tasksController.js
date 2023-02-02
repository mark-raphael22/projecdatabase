
const Tasks = require("../models/tasks");
const asyncwrapper = require("../middleware/async")




const getallTasks = asyncwrapper(async(req,res)=>{
   
        const tasks = await Tasks.find()
        res.status(200).json({numoftasks:tasks.length,tasks})
    
})

//get a single task
const getSingleTask = asyncwrapper(async(req,res)=>{
const {taskId}=req.params
const task = await Tasks.findOne({ _id:taskId });
    if(!task){
        return res.status(404).json({message: 'Task with the id :${taskId} not found'})
    }
    res.status(200).json({task})
    

})

//create task 
const createTask = asyncwrapper(async(req,res)=>{
 
    const {title,priority}=req.body
    if(!title || !priority){
        return res.status(400).json({message:"please provide neccesary information"});

    }
    const task = await Tasks.create(req.body)
    res.status(201).json({msg:"tasks created successfully",task})
 
})

//update task
const updateTask = asyncwrapper(async(req,res)=>{
    const {taskId}=req.params
   

    const task =await Tasks.findByIdAndUpdate({_id: taskId},req.body,{new:true,runValidators:true,})
    if (!task) {
        return res.status(404).json({message: 'Task not found'})
    }
    res.status(200).json({message:'updated successfully', task})
})

//delete task
const deleteTask = asyncwrapper(async(req,res)=>{
    const {taskId} = req.params
    
    const task = await Tasks.findByIdAndDelete({_id:taskId }) ;
    if(!task){
        return res.status(404).json({message: `Task with the id : ${taskId} is not deleted`})
    }
        res.status(200).json({message:"deleted",task})
});





module.exports = {
    getallTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,

}