require("dotenv").config()
const express = require("express")
const app = express()
const port = 4020
const mongoose = require("mongoose")
const notFound=require("./middleware/notfoundroute")
const errorHandler=require("./middleware/errorHandler")

const taskRouter=require("./routes/taskRouter");
mongoose.set("strictQuery", true);
//middle ware
app.use(express.json())


//routes
app.use("/api/v1/tasks",taskRouter)
app.use(errorHandler)

//error route
app.use(notFound);

//db 
const startServer = async()=>{
try {
    await mongoose.connect(process.env.MON_URI);
app.listen(port,()=>{
    console.log(`ready to connect on port ${port}..`);
})
} catch (error) {
    console.log(error);
}
}
startServer();