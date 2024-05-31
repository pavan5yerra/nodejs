const express = require('express');
const fs = require('fs');
const users = require("./MOCK_DATA.json");


const app =  express ();
const PORT = 8000;


// implementation of middleware

// used for handling  of processing req body  - here  we are using in built middleware
app.use(express.urlencoded({extended:false}));

// custom middle ware -- logging middleware
app.use((req,res,next) => {
    fs.appendFile('log.txt' , `${Date.now()}: ${req.url}` , (err,result)=> {
        console.log("Hello from Logging middleware1");
    });
  
    next();
})

// custom middle ware -- modifying req object
app.use((req,res,next) => {
    req.X_myname = "pavanyerra"
    console.log("Hello from middleware2");
    next();
    
})

app.get("/users" , (req,res) => {
        return res.json(users);
})

app.get("/users/firstname" , (req,res) => {
    const html = `<ul>
            ${users.map(user => `<li> ${ user.first_name}</li>`)}
            </ul>`
        return res.send(html);
})

// if the routes are same but methods are different 
// we can use route method which will segreggate all the routes

// app.get("/users/:id" , (req,res) => {
//     const id =  Number(req.params.id);
//     const user = users.find((user) => user.id == id);
//     res.json(user);
// })
// app.put('/users/:id', (req,res) => {
//     res.json({status  : "Pending"});
// })

// app.delete('/users/:id',(req,res) => {
//      res.json({status : "pending"});
// })


// using route method

app.route("/users/:id")
.get((req,res) => {
    const id =  Number(req.params.id);
    const user = users.find((user) => user.id == id);
    res.json(user);
})
.put((req,res) => {
    res.json({status  : "Pending"});
})
.delete((req,res) => {
    res.json({status : "pending"});
});

app.post('/users' , (req,res) => {
    res.json({status  : "Pending"});
})


app.listen(PORT , () => console.log("Server is started"));