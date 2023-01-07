const mongoose =require("mongoose")

const todoSchema=mongoose.Schema({
    task:String,
    status:Boolean
})

const todoModel=mongoose.model("todos",todoSchema)

module.exports={
    todoModel
}