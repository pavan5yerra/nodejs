***Modules in Node js***

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


**File Handling In Node js**



file.js

```javascript
const file = require('fs');


function WriteFile () {
    console.log("writing file");
    //Synchronous or blocking method
    file.writeFileSync("./src/test.txt", 'Hello world');
    //ASynchronous or non blocking method
    file.writeFile("./src/test.txt" , "hello iam test file 2" , (err) => {})
}


function ReadFile () {
     console.log("reading File");
       //Synchronous or blocking method  and it will return  result as value
     const read = file.readFileSync ("./src/test1.txt" , 'utf-8');
     console.log("Sync function \n",read);

       //ASynchronous or non blocking method , it take call back  where we can acces result object
     file.readFile ("./src/test1.txt" , 'utf-8' , (err, result) => {
            if(err)  console.log("Error" , err);
            else  console.log("ASync function \n", result);
     });
}


function AppendFile () {
     console.log("Appending to File");
     file.appendFileSync('./src/test1.txt', `${ new Date().getDate().toLocaleString()} hey there\n`);
}

module.exports = {
    WriteFile,
    ReadFile,
    AppendFile
}
```

### File Stats :
```javascript
/*about a file or directory, such as size, creation time,
and modification time.*/

const fs = require('fs');

fs.stat('example.txt', (err, stats) => {
  if (err) throw err;
  console.log('File stats:', stats);
});
```


### File Watching:
```javascript
const fs = require('fs');

fs.watch('example.txt', (eventType, filename) => {
  if (filename) {
    console.log(`File changed: ${filename}`);
  } else {
    console.log('Filename not provided');
  }
});

console.log('Watching for changes...');
```


### Streams:
```javascript
const fs = require('fs');

// Create a readable stream
const readableStream = fs.createReadStream('large-file.txt', { encoding: 'utf8' });

// Listen for 'data' events to read chunks of the file
readableStream.on('data', (chunk) => {
  console.log('Chunk received:', chunk);
});

// Handle the end of the stream
readableStream.on('end', () => {
  console.log('File reading completed.');
});
```
```javascript
const fs = require('fs');

// Create a writable stream
const writableStream = fs.createWriteStream('output.txt');

// Write data to the stream
writableStream.write('Hello, World!\n');
writableStream.write('More data!');

// End the stream
writableStream.end(() => {
  console.log('File writing completed.');
});
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


