require("dotenv").config()
const mongoose=require("mongoose")
const express=require("express")

const{createTask,getTasks,updateTask,delteTask, deleteTask}=require("./controllers/task.controller")
const app=express();
app.use(express.json());
mongoose.connect(process.env.mongo_URI);
app.post("/tasks",createTask)
app.get("/tasks",getTasks)
app.put("/tasks/:id",updateTask)
app.delete("/tasks/:id",deleteTask)
app.listen(process.env.PORT);
