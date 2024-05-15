import express from "express"
export const todosRoute = express.Router();

// CRUD SUR LES todos 

// Créer une route sur la mathode post avec l'url'/'
// Récuperer les données du body: title;
// Tester si dans le body y'a title:
// Si pa title retourne 400 avec erreur
// Sinon: retour message "ok"

todosRoute.post('/',async (req , res) => {
    const title = req.body.title
    if(!title){
        return res.status(400).json({error: "oubligatoire"})
    }
    const newTodoList = new TodoModel({
        title: title,
        createdAt: new Date()
    })
    const todoListAjouter = await newTodoList.save()

    return res.json({todo: todoListAjouter})
})