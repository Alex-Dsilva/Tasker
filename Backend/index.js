const express=require("express")
const {connection}=require("./db")
const {todoRouter}=require("./Routes/todo.route")
require('dotenv').config()



const app=express()
app.use(express.json())


app.get("/",(req, res)=>{
    res.send("Welcome")
})

app.use("/todos",todoRouter )


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (err) {
        console.log("Error While Connecting to DB")
        console.log(err)
    }
    console.log(`Server is running on ${process.env.port}`)
})