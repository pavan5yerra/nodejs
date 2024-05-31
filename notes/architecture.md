Node JS Architecture  internal working



Node Js is built with two components  V8 Engine (Google's) +   LibUV

- V8  Engine is for Executing javascript code 
- Lib UV is a library used for handling Eventloop and Thread Pools.




![image.png](https://eraser.imgix.net/workspaces/um5QKlcxzhTnWc1cS4cw/2TpPe0m2nPZODyVZctbl8Rh7kLL2/21_C-hUeAvuh8RIL8dxpZ.png?ixlib=js-3.7.0 "image.png")







![image.png](https://eraser.imgix.net/workspaces/um5QKlcxzhTnWc1cS4cw/2TpPe0m2nPZODyVZctbl8Rh7kLL2/w1UW7Fb1R4bX39PCzMitg.png?ixlib=js-3.7.0 "image.png")







![image.png](https://eraser.imgix.net/workspaces/um5QKlcxzhTnWc1cS4cw/2TpPe0m2nPZODyVZctbl8Rh7kLL2/pt6Nq5zxs5hy_fLsRD7x2.png?ixlib=js-3.7.0 "image.png")





![image.png](https://eraser.imgix.net/workspaces/um5QKlcxzhTnWc1cS4cw/2TpPe0m2nPZODyVZctbl8Rh7kLL2/CiI4WbMtdddNHNgdv9nyC.png?ixlib=js-3.7.0 "image.png")





**Execution Steps : **



The initial step of node js is to run an entry point file (index.js). 

It creates a  Node Environment where the main thread (single Thread) is created. The below steps happen inside it

1. Initialize the project.
2. Top-Level Code Execution 
    1. code that is not  inside a function  or callback is called Top-level code
3. Execution of Require Modules.
4. Registering Event callbacks --> (SetTimeOut, SetIntervals)
5. Start the Event Loop


**Event Loop trying to check  below in each iteration**

1. Expired Times
2. Async I/O callbacks
3. set Immediate
4. close callbacks
5. If any task is pending repeat all steps
6. If no task is pending exit the Process.
7. if no task exits Process






![image.png](https://eraser.imgix.net/workspaces/um5QKlcxzhTnWc1cS4cw/2TpPe0m2nPZODyVZctbl8Rh7kLL2/C-y6ZGRcU2tSSy7QUkWEs.png?ixlib=js-3.7.0 "image.png")





![image.png](https://eraser.imgix.net/workspaces/um5QKlcxzhTnWc1cS4cw/2TpPe0m2nPZODyVZctbl8Rh7kLL2/wJW3tR0DTCluORyxzm0pg.png?ixlib=js-3.7.0 "image.png")







Understanding Architecture Flow Using Code 







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
-> Hello iam an immediate2
-> Hello iam a timer2
-> Hello iam a timer3
-> 600ms password 1 DONE
-> 610ms password 2 DONE
-> 609ms password 3 DONE
-> 608ms password 4 DONE
-> 1100ms password 4 DONE
```




****

**How is Node JS Different from other languages?**



![image.png](https://eraser.imgix.net/workspaces/um5QKlcxzhTnWc1cS4cw/2TpPe0m2nPZODyVZctbl8Rh7kLL2/deEeIkRnsca0MaSTjDmhl.png?ixlib=js-3.7.0 "image.png")



