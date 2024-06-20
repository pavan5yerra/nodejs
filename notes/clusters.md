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





