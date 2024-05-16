import express from 'express'
import { todoModel } from "../database/todo-list.js";


export const todosRoute = express.Router();
todosRoute.get("/", async (req, res)=>{
    
    const todos = await todoModel.find();
    return res.json(todos)
})

todosRoute.get("/:id", async (req, res) =>{
    const todoId = req.params.id

    const todos = await todoModel.findById(todoId).exec();
    if(!todos){
        return res.status(404)
    }
    return res.json(todos)
})



// todosRoute.post("/", async (req, res) => {
//     const data = req.body; 
//     console.log(data);
  
//     if (!data.title) {
//       return res.status(400).json({ error: "title is mandatory" });
//     }
//     const newTodolist = new todoModel({
//       title: data.title,
//       createdAt: new Date(),
//     });
//     const addedTodolist = await newTodolist.save();
//     return res.json({ todo: addedTodolist });
//   });

todosRoute.post('/', async(req, res) => {
    const title  = req.body;
    console.log(title)
    if (!title) {
      return res.status(400).json({ error: 'Le titre est obligatoire.' });
    }
    const newTodoList = new TodoModel({
        title: title,
        createdAt: new Date()
    })

    const todolistAouter = await newTodoList.save()

    return res.json({todo: todolistAouter})
  });




todosRoute.put("/:id",async (req, res)=>{
    const todoId = req.params.id
    const newTitle = req.body.title
    if(!newTitle){
        return res.status(400)({error: "titre oubligatoire"})
    }
    const todo = await  todoModel.findById(id).exec()
    if(!todo){
        return res.status(404)({error: "todo introuvable"})
    }
    todo.title = newTitle;

    await todo.save

    return res.json(todo)
})


// Djemai Samy — Today at 1:55 PM
// Exercice 5:
// 1. Ajouter un route Delete avec id dans les paramètre
// 2. Récuperer la tache avec ID
// 3. 404 si ell n'existe pas
// 4. La supprimer si elle existe
// 5. Retourner un message.

todosRoute.delete("/:id",async (req, res)=>{
    const id = req.params.id
    const todo =  await todoModel.findById(id)

    if(!todo){
        return res.status(404)({error: "todo introuvable"})
    }

    await todo.deleteOne()
    return res.json({message: "Todolist suprimée"})
})



todosRoute.post('/:id/todo',async (req, res)=> {
    const todoListID = req.params.id;
    const todoTitle = req.body.title
    const todoList = await todoModel.findById(todoListID);
    if (!todoList){
        return res.status(404).json({error: "todolist introuable"})
    }
    todoList.todos.push({title: todoTitle})
    await todoList.save()
    return res.json(todoList)
})


todosRoute.get('/:listId / :todoId' ,async (req, res)=> {
    const {listId , todoId} = req.params
    const {title , isDone} = req.params
    
    const todoList = await todoModel.findById(listId);
    
    if (!todoList){
        return res.status(404).json({error: "todolist introuable"})
    }

    const todo = todoList.todo.id(todoId)
    todo.set({
        title: title ? title: todo.title,
        isDone: isDone ? isDone : todo.isDone
    })
    await todoList.save()
    return res.json({message: "todo modifié"})
    
})



todosRoute.delete('/:listId / :todoId' ,async (req, res)=> {
    const {listId , todoId} = req.params

    const todoList = await todoModel.findById(listId);
    
    if (!todoList){
        return res.status(404).json({error: "todolist introuable"})
    }

    const todo = todoList.todo.id(todoId)
// ENleve la tache

    todoList.todo.pull(todo)


    await todoList.save()
    return res.json({message: "todo modifié"})
    
})