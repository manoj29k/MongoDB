// Définir un schema 

import mongoose from "mongoose"

const TodoListSchema = mongoose.Schema({
    title: {type: String, required: true},
    createdAt:{type: Date},
    todos: [
        {
            title: {type: String, required: true},
            isDone: {type: String, required: true , default: false}
        }
    ]
})

// Exporté le model pour étre utilisé allieurs

export const todoModel = mongoose.model("todolist", TodoListSchema)
