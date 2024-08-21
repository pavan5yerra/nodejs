
### File Handling In Node js

The `fs` (File System) module in Node.js provides a variety of methods to interact with the file system. It allows you to read, write, update, and delete files and directories. 
The `fs` module offers both synchronous and asynchronous methods to handle file operations, which is essential for non-blocking I/O in Node.js applications.
Here’s a detailed overview of the `fs` module and its functionalities:



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


[YouTube Video - 64LJJhT6Ybo](https://www.youtube.com/watch?v=64LJJhT6Ybo)

 
 ***Why Streams ?***



Let say we want to read a 50MB file  from network or file . 

code with out using stream in express.js

```javascript
﻿const express = require("express");
const fs = require("fs");

const app = express();
const PORT =8000;

app.get("/", (req,res) => {
    fs.readFile("./sample.txt",(err,data) => {
        res.end(data);
    })
})

app.listen(PORT , () => {
  console.log(`server started on ${PORT});
})
```


What the problem with the above code 

- when reading the file the data is store data variable . And this data variable wiill stored in RAM
- So when we read a file of 50 MB  it will occupy 50MB  of SPACE  in RAM (This is for one Request)
- For Every Request 50MB will occupied in RAM , which in term  overload the RAM.
- you can monitor this scenario using  express-status-monitor


**RAM STATUS for one request :**





![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/SGLyqiVbUckheYCCzvfa9.png?ixlib=js-3.7.0 "image.png")



when server gets multiple request  you can see memory went 366 MB



![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/D7P34xo2mkpXhDy2leVJQ.png?ixlib=js-3.7.0 "image.png")





To handle this scenario , we will be using streams.


Code for  reading Data from a file and  write it  to response.



```javascript
const express = require("express");
const fs = require("fs");

const app = express();
const PORT =8000;

//normal way of handling large data
app.get("/normal", (req,res) => {
    fs.readFile("./sample.txt",(err,data) => {
        res.end(data);
    })
})

app.get("/stream" , (req,res) =>  {
    const stream = fs.createReadStream(".sample.txt",'utf-8');
    stream.on('data',(chunk) => res.write(chunk));
    stream.on('end' , () => res.end());
    
})

app.listen(PORT , () => {
  console.log(`server started on ${PORT});
})
```




even after multiple read request the memory consumed is less .

![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/A4r_P2TGBFGUK25qYvDcz.png?ixlib=js-3.7.0 "image.png")





**Transfer encoding in chunked**



Another Example:   we need (READ) 400MB file  -->  ZIP  ---> write 400MB file



```javascript
const express = require("express");
const fs = require("fs");
//library for zipping
const zlib = require('zlib');

const app = express();
const PORT =8000;

//normal way of handling large data
app.get("/normal", (req,res) => {
    fs.readFile("./sample.txt",(err,data) => {
        res.end(data);
    })
})

// handling in streams
app.get("/stream" , (req,res) =>  {
    const stream = fs.createReadStream(".sample.txt",'utf-8');
    stream.on('data',(chunk) => res.write(chunk));
    stream.on('end' , () => res.end());
    
})


//zip on go  when reading and unzip and wrting 
//we are using pipe (its nothing but caputuring previous steam data)
app.get("/zip" , (req,res) => {
    fs.createReadSteram("./sample.txt",'utf-8')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(".sample.zip"))
})

app.listen(PORT , () => {
  console.log(`server started on ${PORT});
})


```

**Here are some of the benefits of using streams in Node.js:**

- Streams enable faster data processing as data is processed chunk by chunk. (helps when reading large data sets or live stream (**Performance Improvement)**
-  Streams allow for efficient memory usage by processing data in smaller chunks (**Efficient Memory Usage)**
- Node.js's non-blocking I/O model, combined with streams, allows applications to handle multiple concurrent requests efficiently. (**Scalability)**
- Streams are essential for building real-time applications, such as chat applications, streaming services, and data processing pipelines. (**Real-time Data Processing)**
- Streams can be easily chained together to create complex data processing pipelines. This allows developers to modularize their code and reuse streams for different tasks, enhancing code readability and maintainability.
- Streams offer flexibility in data handling by supporting various data types, including text, binary data, and objects(**Flexibility).**
- They allow developers to handle data processing without blocking the main thread, enabling efficient and responsive applications.(**Asynchronous Programming)**


**What are Streams..?**

- Streams are an abstract interface for working with streaming data in Node.js.
- They provide a way to read and write data efficiently, without having to load the entire data set into memory at once.
- Streams are often used for processing large files, network communication, and other forms of data exchange.
There are four types of streams in Node.js:

- Readable streams:  These streams allow you to read data from a source, such as a file or a network connection.
- Writable streams:  These streams allow you to write data to a destination, such as a file or a network connection.
- Duplex streams: These streams allow you to both read and write data.
- Transform streams: These streams allow you to transform data as it is being read or written.




Streams are a powerful tool for working with data in Node.js.

They allow you to efficiently read and write data, without having to load the entire data set into memory at once.



**Here are some examples of how to use streams in Node.js:**



```javascript
// Read from a file
const fs = require('fs');
const readStream = fs.createReadStream('my-file.txt');

readStream.on('data', (chunk) => {
  // Process the data chunk
});

readStream.on('end', () => {
  // All data has been read
});

// Write to a file
const writeStream = fs.createWriteStream('my-file.txt');

writeStream.write('Hello, world!');

writeStream.end();

// Create a duplex stream
const duplexStream = new Duplex();

duplexStream.on('data', (chunk) => {
  // Process the data chunk
});

duplexStream.write('Hello, world!');

// Create a transform stream
const transformStream = new Transform();

transformStream.transform((chunk, encoding, callback) => {
  // Transform the data chunk
  callback(null, chunk.toUpperCase());
});

transformStream.on('data', (chunk) => {
  // Process the transformed data chunk
});

// Pipe streams together
const readStream = fs.createReadStream('my-file.txt');
const writeStream = fs.createWriteStream('my-other-file.txt');

readStream.pipe(writeStream);
```
