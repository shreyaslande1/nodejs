const http = require("http");
const fs = require("fs");
const myserver = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Req Received\n`
  fs.appendFile('log.txt', log, (err,data)=>{
    switch(req.url){
        case "/":
            res.end("homepage");
            break;
        case "/about":
            res.end("aboutpage");
            break;
        case "/contact":
            res.end("contact page");
            break;
        default:
            res.end("404 Not found")
    }
  })
});

myserver.listen(8000, () => {
  console.log("server started");
});
