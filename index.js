require('dotenv').config()
const mongoose=require("mongoose")
const User=require("./models/user.model")
const express=require("express")
const app=express()
app.use(express.json())
const{createTask,updateTask,deleteTask,getTasks}=require("./controllers/task.controller")
mongoose.connect(process.env.MONGO_URI)
app.get("/task",getTasks)
app.post("/task",createTask)
app.put("/task/:id",updateTask)
app.delete("/task/:id",deleteTask)
app.listen(process.env.PORT)

// Register User
app.post("/register", async (req, res) => {

    const user = await User.create(req.body)

    res.json(user)
})


// Login User
app.post("/login", async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (!user) {
        return res.json({
            message: "Invalid Credentials"
        })
    }

    res.json({
        message: "Login Successful"
    })
})