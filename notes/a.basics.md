***Modules in Node js***

### Difference between  require and import 


- **Module Systems : (Common JS vs ES Modules)**
    - require comes from common JS. It's the default module for Node JS.
    - `**import**` **:** Is supported natively in modern browsers and in Node.js (from version 12 onward with the `.mjs`  extension or setting `"type": "module"`  in `package.json` ).
- **Syntax :** 
    - `const module = require('module-name');` 
    - `import module from 'module-name';` 
-  **Synchronous vs. Asynchronous Loading:**
    -  `**Require**`** **loads modules **synchronously**. When a module is required, it blocks further execution until the module is fully loaded. This can be less efficient for large applications.
    - `**import**` **:** Can be **asynchronous**, especially in the browser, allowing for better performance. You can even dynamically  import modules using:
```javascript
﻿import('module-name').then(module => {
  // use module
});  
```
- **Hosting**: 
    - `**require**` **:** Is executed at runtime, meaning it’s not hoisted . and it can be  dynamic loading
    - `**import**` **:** Is statically analyzed and hoisted. All `import`  statements are executed at the start of the file before any other code runs, even if they appear later in the file.
```javascript
if (someCondition) {
  const module = require('module-name');
} 

if (someCondition) {
  import('module-name').then(module => {
    // use module
  });
}
```


Math.js

```javascript
function add = (a,b) => {
   return a-b;
}

function sub= (a,b) => {
   return a-b;
}

module.export = {
   add,
   sub
}
```


index.js

```
const {add , sub}   = require(./Math.js);

console.log(add(1,2));
console.log(sub(3,1));
```



***Creating a Server with HTTP module***



```javascript
const http = require('http');

//creates a server 
// but who will handle the server - handler will handle the server 
// createserver take handler call back function to handle the request
// handler will give two params  , request and res 
const server = http.createServer( (req,res) => {

     console.log(" requests logging" , req);
    // sending response to client
    res.end("hello from Server")
});


// on which address or port server should be called on 
// listen will take a call back function
server.listen(8000,() => {
    console.log("Server Started")
})
```


***Handling routes in Node Js with switch Case***

```javascript
const server = http.createServer( (req,res) => {
    //loggin the reuqest  
    // we need to use async append ( non blocking write) other wise it will block the use request 
    const log = `${Date.now()} : ${req.url} New Request Recieved\n`;
    file.appendFile('log.txt' ,log , (err,data) => {
            // handling routes 
            switch(req.url){
                case '/' : 
                    res.end("hello home page");
                    break;
                case '/about':
                    res.end("Hello iam Pavan Yerra");
                    break;
                default : 
                    res.end("Page not found");
                    break;
            }
            // sending response to client
            res.end("hello from Server")
    });
});
```


