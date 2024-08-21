## Clusters

**Why to use Clusters..?**

[YouTube Video - JoPZ9gEvpz8](https://www.youtube.com/watch?v=JoPZ9gEvpz8)


Lets say we  server which is handling multiple requests. As days goes on  number of users

increases, so that load on the server increases. To handle this we can use clusters  in NODE Js


**Single Server**

![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/13wvtesi_ZB5ETy30cz1l.png?ixlib=js-3.7.0 "image.png")



**Cluster:**


![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/ZWu9dVplT-RglmTN18qUf.png?ixlib=js-3.7.0 "image.png")



**Sample code for creating clusters.**


```javascript
const cluster = require('cluster');
const express = require('express');
const os = require('os');

const totalCpus = os.cpus.length;

//if the machine is primary divide or fork in subsystems
//based on number of cpu's
if(cluster.isPrimary) {
   for(let i=0 ; i<totalCpus.length ; i++){
       cluster.fork();
   }
}
//if its not a primary cluster 
//then  create a server with port 8000
else {
   const app = express();
   PORT=8000;
   app.get('/',(req,res) => {
       return res.json({message : `Hello from Express Server ${process.pid}`})

   })
   
   app.listen(PORT , () => console.log("server stared on"+PORT))
}
```


![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/wK4T-pij5X4jVkigU8D18.png?ixlib=js-3.7.0 "image.png")



### Main components on Cluster module
1. **Worker Process : **
    1. In a clustered Node.js application, each worker process is a separate instance of the Node.js runtime. 
    2. Each worker runs independently and can handle incoming requests or tasks. 
    3. Workers communicate with each other through inter-process communication (IPC) channels.
2. **Master Process:**
    1. The master process is responsible for managing worker processes. It can create and manage multiple workers and handle the distribution of incoming connections or tasks.
3. **Load Balancing**
    1. The `cluster`  module automatically handles load balancing between worker processes. This helps distribute incoming requests or tasks more evenly across the available workers.
    2. It uses round robin algorithm for  load balancing


### Key Methods:
`cluster.fork()` 

Creates a new worker process. The `fork` method is used by the master process to create worker processes.



```javascript
const cluster = require('cluster');

if (cluster.isMaster) {
  cluster.fork(); // Create a new worker
}
```
`cluster.isMaster` 

A boolean that indicates if the current process is the master process.



`cluster.isWorker` 

A boolean that indicates if the current process is a worker process



`cluster.on('exit', callback)` 

Event that is emitted when a worker process exits. The callback receives the worker, exit code, and signal as arguments.



```javascript
cluster.on('exit', (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} died`);
});
```


`cluster.on('online', callback)` 

Event that is emitted when a worker process is online. The callback receives the worker as an argument.

```javascript
cluster.on('online', (worker) => {
  console.log(`Worker ${worker.process.pid} is online`);
});
```


`cluster.on('message', callback)` 

Event that is emitted when a worker sends a message to the master process. The callback receives the message and the worker as arguments.



```javascript
cluster.on('message', (worker, message, handle) => {
  console.log(`Master received message from worker ${worker.process.pid}:`, message);
});
```


`worker.send(message)` 

Sends a message from a worker to the master process. The master process can handle this message using the `message` event.

```javascript
// In worker process
process.send({ hello: 'world' });
```
`worker.process` 

Provides access to the worker's underlying `ChildProcess` instance. You can use it to interact with the worker process, such as sending signals.





```javascript
const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length; // Number of CPU cores

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
    // Optionally restart worker
    cluster.fork();
  });

  // Handle worker messages
  cluster.on('message', (worker, message) => {
    console.log(`Master received message from worker ${worker.process.pid}:`, message);
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    // Close all workers
    for (const id in cluster.workers) {
      cluster.workers[id].send('shutdown');
    }
    // Wait for workers to exit
    setTimeout(() => {
      console.log('Exiting master process.');
      process.exit(0);
    }, 1000);
  });
} else {
  
  // Worker processes
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
  });

  server.listen(8000, () => {
    console.log(`Worker ${process.pid} started and listening on port 8000`);
  });

  // Handle messages from the master
  process.on('message', (message) => {
    if (message === 'shutdown') {
      console.log(`Worker ${process.pid} received shutdown message`);
      server.close(() => {
        console.log(`Worker ${process.pid} closed server`);
        process.exit(0);
      });
    }
  });

  // Optionally send a message to the master
  process.send({ hello: 'world' });
}
```




