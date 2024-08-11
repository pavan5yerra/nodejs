***Node JS Architecture  internal working***



Node Js is built with two components  V8 Engine (Google's) +   LibUV

- V8  Engine is for Executing javascript code 
- Lib UV is a library used for handling Eventloop , Thread Pools (non blocking I/O operations)
- Node.js is a JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser.
- It is built on top of Chrome's V8 JavaScript engine, which is responsible for compiling and executing JavaScript code.
- Node.js also provides a number of additional modules and features, such as a networking library, a file system library, and a database library.

***EventLoop***
- The Node.js engine is single-threaded, which means that it can only execute one task at a time.
- However, Node.js is able to handle multiple concurrent requests by using an event loop.
- The event loop is a mechanism that allows Node.js to listen for events and then execute callbacks when those events occur.

- When a request comes in to a Node.js server, the request is added to the **event queue or callback queue**.
- The event loop then checks the event queue and executes the callback for the first request in the queue.
- The callback function is responsible for handling the request and then returning a response.
- Once the callback function has returned a response, the event loop will then check the event queue again and execute the callback for the next request in the queue.
- This process continues until all of the requests in the event queue have been processed.
- The event loop architecture allows Node.js to handle multiple concurrent requests without blocking.
- This is because the event loop can continue to process other requests while a callback function is executing.

***Thread Pool***
- In addition to the event loop, Node.js also uses a thread pool to handle blocking operations.
- Blocking operations are operations that can take a long time to complete, such as reading a file from the disk or writing to a database.
- When a blocking operation is required, Node.js will assign the operation to a thread in the thread pool.
- The thread pool will then execute the operation and return a result to the event loop. Once the event loop has received the result, it will then execute the callback function for the request.
- The thread pool architecture allows Node.js to handle blocking operations without blocking the event loop.
- This is because the thread pool can continue to execute blocking operations while the event loop is processing other requests.

- The combination of the event loop and the thread pool architecture allows Node.js to be a very efficient and scalable runtime environment.
-  Node.js is able to handle a large number of concurrent requests without blocking, and it is also able to handle blocking operations without blocking the event loop.


![image](https://github.com/pavan5yerra/nodejs/assets/53389849/c6196c92-c40b-4f67-bb29-2d8fe558ce73)
![image](https://github.com/pavan5yerra/nodejs/assets/53389849/ae7c2949-ac1d-40d3-aacd-6833245ef2f1)
![image](https://github.com/pavan5yerra/nodejs/assets/53389849/fc76d234-6732-472f-bc8c-e12462a04d5f)
![image](https://github.com/pavan5yerra/nodejs/assets/53389849/630c5ad5-ee2d-43a9-acdf-d2f0d9be35b2)

***Execution Steps***



The initial step of node js is to run an entry point file (index.js). 

It creates a  Node Environment where the main thread (single Thread) is created. The below steps happen inside it

1. Initialize the project.
2. Top-Level Code Execution 
    1. code that is not  inside a function  or callback is called Top-level code
3. Execution of Require Modules.
4. Registering Event callbacks --> (SetTimeOut, SetIntervals)
5. Start the Event Loop


***Event Loop trying to check  below in each iteration***

1. Expired Times
2. Async I/O callbacks
3. set Immediate
4. close callbacks
5. If any task is pending repeat all steps
6. If no task is pending exit the Process.
7. if no task exits Process

![image](https://github.com/pavan5yerra/nodejs/assets/53389849/73ee7031-f434-4fd2-a35d-06ab8695586c)


![image](https://github.com/pavan5yerra/nodejs/assets/53389849/c85f016f-6068-4e9f-9b8d-17d6ab76a362)


***Understanding Architecture Flow Using Code***

```javascript
 //module
 const fs = require('fs');
 
 //timer
 setTimeout(() => console.log("Hello iam a timer1") , 0);
 
 // immideate call backs
setImmediate(()=> console.log("Hello iam an immediate")));
 
 //toplevel code
 console.log("hello");
 
 //Ouput
 
-> hello
-> Hello iam a timer1
-> Hello iam an immediate
 
```




```javascript
//module
 const fs = require('fs');
 
 //timer
 setTimeout(() => console.log("Hello iam a timer1") , 0);
 
 // immideate call backs
 setImmediate(()=> console.log("Hello iam an immediate")));
 
 //toplevel code  --> 
 //if we remove top level code setImmediate Excutes first
 // why ..? -> It purily depends on cup performance
 //console.log("hello");
 
 //Ouput


-> Hello iam an immediate
-> Hello iam a timer1
```






```javascript
//module
 const fs = require('fs');
 const crypto = require('crypto');
 
 const start = Date.now();
 //timer
 setTimeout(() => console.log("Hello iam a timer1") , 0);
 
 // used for increasing thread pool size

 process.env.UV_THREADPOOL_SIZE=6;
 
 //I/O callback might take time , so it will execute after its completion
 fs.readFile("sample.txt' , 'utf-8' , () => {
     console.log("Iam I/o polling" )
     
     // timeer will start after I/O polling finish
     setTimeout(() => console.log("Hello iam a timer2") , 0);
     setTimeout(() => console.log("Hello iam a timer3") ,5000);
     setImmediate(()=> console.log("Hello iam an immediate2")));
     
     
     //CPU intesive Tasks -- it will offloaded to thread pool
     // and run  parellely on 4 thread pools
     
     crypto.pbkdf2("password1" , 'salt1' , 100000 , 1024 , 'sha512' , () => {
console.log(Date.now()-start ,"password 1 DONE");
     });
     
     crypto.pbkdf2("password2" , 'salt1' , 100000 , 1024 , 'sha512' , () => {
console.log(Date.now()-start,"password 2 DONE");
     });
     
     crypto.pbkdf2("password3" , 'salt1' , 100000 , 1024 , 'sha512' , () => {
console.log(Date.now()-start,"password 3 DONE");
     });
     
     crypto.pbkdf2("password4" , 'salt1' , 100000 , 1024 , 'sha512' , () => {
console.log(Date.now()-start,"password 4 DONE");
     });
     
     
     // As thread pool are only 4 it will wait  until any thread free 
     // so it will take time than above for threads
     
     crypto.pbkdf2("password4" , 'salt1' , 100000 , 1024 , 'sha512' , () => {
console.log(Date.now()-start,"password 4 DONE");
     });
     
 });
 
 //immideate call backs

  setImmediate(()=> console.log("Hello iam an immediate1")));

 // toplevel code  
 console.log("hello from top code");
 
 
 
 //Output
-> hello from top code 
-> Hello iam a timer1
-> Hello iam an immediate1
-> Iam I/o polling
-> Hello iam a timer2
-> Hello iam an immediate2
-> 600ms password 1 DONE
-> 610ms password 2 DONE
-> 609ms password 3 DONE
-> 608ms password 4 DONE
-> 1100ms password 4 DONE
-> Hello iam a timer3
```



``` javascript
const fs = require('fs');
console.log('Before');

fs.writeFile("sample.txt","hello" , () => {
    console.log("hello");
});

setTimeout(() => {
    console.log("hello timer")
},0)

setImmediate(() => {
    console.log("imme");
})
process.nextTick(() => {
    console.log('Next tick');
});

console.log('After');


/*

'Before' (from console.log('Before');)
'After' (from console.log('After');)
'Next tick' (from process.nextTick(() => { console.log('Next tick'); });)
'hello timer' (from setTimeout(() => { console.log("hello timer"); }, 0);)
'hello' (from the fs.writeFile() callback)
'imme' (from setImmediate(() => { console.log("imme"); });)
*/

```

****

**How is Node JS Different from other languages?**

![image](https://github.com/pavan5yerra/nodejs/assets/53389849/4bb54f3a-fe39-4060-a53c-9ae7189c0349)




