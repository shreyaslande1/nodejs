// const http = require("http");
//dont need http because of express
const fs = require("fs");
const url = require("url");
const express = require("express")
const app = express();

app.get("/",(req, res)=>{
    return res.send("hello from server hp")
})
app.get("/about",(req, res)=>{
    return res.send("hello from about page"+req.query.name + " "+req.query.age)
})

// const myserver = http.createServer(app)
// function myhandler(req, res){
//     if(req.url === "/favicon.ico") return res.end();
//     const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`
//     const myurl = url.parse(req.url, true);
//     console.log(myurl)
//   fs.appendFile('log.txt', log, (err,data)=>{

//     switch(myurl.pathname){
//         case "/":
//             res.end("homepage");
//             break;
//         case "/about":
//             const username = myurl.query.myname

//             res.end(`hi, ${username}`);

//             break;
//         case "/signup":
//             if(req.method==="GET"){
//                 "this is signup form"
//             }else if(req.method==="POST"){
//                 res.end("success")
//             }
//         case "/search":
//             const search = myurl.query.search_query
//             res.end(`here is the result for search `+search)
//             break;
//         case "/contact":
//             res.end("contact page");
//             break;
//         default:
//             res.end("404 Not found")
//     }
//   })
// };
// myserver.listen(8000, () => {
//   console.log("server started");
// });
// optimal
app.listen(8000, ()=> console.log("server started 2"))