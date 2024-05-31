const file = require('fs');


function WriteFile () {
    console.log("writing file");
    //Synchronous or blocking method
    file.writeFileSync("./src/file/test.txt", 'Hello world');
    //ASynchronous or non blocking method
    file.writeFile("./src/file/test.txt" , "hello iam test file 2" , (err) => {})
}


function ReadFile () {
     console.log("reading File");
       //Synchronous or blocking method  and it will return  result as value
     const read = file.readFileSync ("./src/file/test1.txt" , 'utf-8');
     console.log("Sync function \n",read);

       //ASynchronous or non blocking method , it take call back  where we can acces result object
     file.readFile ("./src/file/test1.txt" , 'utf-8' , (err, result) => {
            if(err)  console.log("Error" , err);
            else  console.log("ASync function \n", result);
     });
}


function AppendFile () {
     console.log("Appending to File");
     file.appendFileSync('./src/file/test1.txt', `${ new Date().getDate().toLocaleString()} hey there\n`);
}

module.exports = {
    WriteFile,
    ReadFile,
    AppendFile
}