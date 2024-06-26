# Express js



Express is a node js web application framework that provides broad features for building web and mobile applications. It is used **to build a single page, multipage, and hybrid web application**. It's a layer built on the top of the Node js that helps manage servers and routes.





 Creating Server in Express.

```javascript
const express = require('express');
const users = require("./MOCK_DATA.json");


const app =  express ();
const PORT = 8000;

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

app.get("/users/:id" , (req,res) => {
    const id =  Number(req.params.id);
    const user = users.find((user) => user.id == id);
    res.json(user);
})

app.put('/users/:id', (req,res) => {
    res.json({status  : "Pending"});
})

app.delete('/users/:id',(req,res) => {
     res.json({status : "pending"});
})

app.listen(PORT , () => console.log("Server is started"));
```






Using routes instead of individual methods if the path is the same



```javascript
const express = require('express');
const users = require("./MOCK_DATA.json");


const app =  express ();
const PORT = 8000;

app.get("/users" , (req,res) => {
        return res.json(users);
})

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
```




***Middleware in Express :***

_**Middleware**_ functions are functions that have access to the [﻿request object](https://expressjs.com/en/4x/api.html#req) (`req`), the [﻿response object](https://expressjs.com/en/4x/api.html#res) (`res`), and the `next` function in the application’s request-response cycle. 

The `next` function is a function in the Express router that, when invoked, executes the middleware succeeding the current middleware.


Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.
If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.


![image](https://github.com/pavan5yerra/nodejs/assets/53389849/d6f44312-ba64-4a2a-9d23-989da4e406f4)



***Normal flow without middleware***

![image](https://github.com/pavan5yerra/nodejs/assets/53389849/1477bd33-efaa-4fb3-9d54-6a6ccd3cc16f)


***Request and response flow using Middleware***

***Middleware authentication request :***

![image](https://github.com/pavan5yerra/nodejs/assets/53389849/00d56b48-d2e3-4f6f-93f9-cc637a69bfcf)


***Request and Response with multiple Middlewares***

![image](https://github.com/pavan5yerra/nodejs/assets/53389849/47d9374c-efdf-4cbb-942f-fbcfc3d2ce3c)


***Implementing Middlewares***

```javascript
const express = require('express');
const fs = require('fs');
const users = require("./MOCK_DATA.json");


const app =  express ();
const PORT = 8000;


// implementation of middleware

// used for handling  of processing req body 
// here  we are using in built middleware
// when we try to submit any form data this middleware will be used
// it looks at content-type header in request
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

app.listen(PORT , () => console.log("Server is started"));
```


