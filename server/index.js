const http = require("http");
const fs = require("fs");
const url = require("url");
const myserver = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Req Received\n`
    const myurl = url.parse(req.url, true);
    console.log(myurl)
  fs.appendFile('log.txt', log, (err,data)=>{

    switch(myurl.pathname){
        case "/":
            res.end("homepage");
            break;
        case "/about":
            const username = myurl.query.myname

            res.end(`hi, ${username}`);

            break;
        case "/search":
            const search = myurl.query.search_query
            res.end(`here is the result for search `+search)
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
