import express from "express"
import mongoose from "mongoose"
import { todosRoute } from "./routes/todos-routes.js";


const MONGODB_URI = "mongodb://127.0.0.1:27017/todos";
const app = express()
const PORT = 4080

app.use('/api/todos', todosRoute);

app.listen(PORT, function(){
    console.log(`le server est lancée sur le port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
    
    mongoose.connect(MONGODB_URI).then(()=>{
        console.log(`Base de donnée connectée`);
    }).catch((err) =>{
        console.log(`Base de données non connectée`);
        console.log(err);
    })
})



// import express from "express";
// import mongoose from "mongoose"
// import {todosRoute }from "./routes/todos-route.js"

// const MONGODB_URI = "mongodb://127.0.0.1:27017/todos";
// const PORT = `4080`;


// const app = express();

// app.use(express.json())
// app.use("/api/todos", todosRoute)


// app.listen(PORT, () => {
//     console.log("Serveur lancé le port 3006")

//     console.log(`http://localhost:${PORT}`);

//     mongoose.connect(MONGODB_URI).then(() =>{
//         console.log("Base de données connectée");

//     }).catch((err) =>{
//         console.log("Base de données non connectée");
//         console.log(err);
//     })
// });