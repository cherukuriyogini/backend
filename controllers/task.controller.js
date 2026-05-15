const Task=require("../models/task.model")

let cacheData=null;
let cacheTime=null

exports.createTask=async(req,res)=>{
    const task=await Task.create(req.body)
    cacheData=null;
    res.json(task)

}

exports.updateTask=async(req,res)=>{
    const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
    cacheData=null;
    res.json(task)
}

exports.deleteTask=async(req,res)=>{
    const task=await Task.findByIdAndDelete(req.params.id)
    cacheData=null;
    res.json({message:"deleted"})
}

exports.getTasks=async(req,res)=>{
    const now=Date.now()
    if(cacheData&&now - cacheTime < 60000){
        return res.json(cacheData)
    }
    const tasks=await Task.find();
        cacheData=tasks
        cacheTime=now
        res.json(tasks)
}