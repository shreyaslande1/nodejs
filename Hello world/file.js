const fs = require("fs");
const os = require("os")

//this is  synchronous function for creating a file
// fs.writeFileSync("./create.txt", "hey this is content")

//this is a asynchronous function for creating a file
// fs.writeFile("./create.txt", "content changed", (err)=>{})

//synchronous function for reading file
// const result = fs.readFileSync("./create.txt", "utf-8");
// console.log(result);

//asynchronous reading
// fs.readFile("./readf.txt", "utf-8", (err,result)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// })

// fs.appendFileSync("./readf.txt", new Date().getDate().toLocaleString())
// fs.copyFileSync("./readf.txt", "./copy.txt")
// fs.unlinkSync("./copy.txt")

//blocking operation uses a thread
// const res = fs.readFileSync("readf.txt", "utf-8")
console.log(1);

//non blocking operation which doesnot uses thread
fs.readFile("readf.txt", "utf-8", (err, res)=>{
    console.log(res);
})
console.log(os.cpus().length)