const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { json } = require("stream/consumers");
const app = express();

const PORT = 8000;
app.use(express.json());
// Middleware should come first
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next)=>{
//     console.log("hello from middleware 1")
//     req.myUserName = "shreyas"
//     next()
// })
// app.use((req, res, next)=>{
//     console.log("hello from middleware 2", req.myUserName)
//     next()
// })

// app.use((req,res, next)=>{
//     fs.appendFile("log.txt", `${Date.now()}: ${req.method}: ${req.path}\n`, (err, data)=>{
//         next();
//     })
// })

app.route("/api/users/:id")
.get((req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id);
    return res.json(user);
})
.patch((req, res)=>{
    const id = Number(req.params.id);
    const body = req.body;
    
    const userindex = users.findIndex((user)=> user.id===id);
    if(userindex===-1){
        return res.status(404).json({message:"user not found"});
    }
    users[userindex] = {
        ...users[userindex],
        ...body,
    }
    fs.writeFile("./MOCK_DATA.json", json.stringify(users, null, 2), err=>{
        if(err){
            return res.status(500).json({message:"fail to upload user"})
        }
        return res.json({
            status: "success",
            message:"user updated successfully",
            user:user[userindex],
        })
    })
})
.delete((req, res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to delete user" });
        }

        return res.json({
            status: "success",
            message: "User deleted successfully",
        });
    });
})

app.post("/api/users", (req, res)=>{
    console.log("got it")
    console.log(req.body)
    const data = req.body;
if(!data || !data.first_name || !data.last_name || !data.email){
    return res.status(400).json({msg: "all feilds are required"});
}

    users.push({...data, id: users.length + 1});

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err)=>{
        if(err){
            return res.status(500).json({error:"Something went wrong"});
        }

        return res.status(201).json({
            status:"success",
            id: users.length
        });
    });
});


app.get("/api/users", (req, res)=>{
    res.setHeader("X-myName", "Shreyas lande")
    return res.json(users);
});


app.listen(PORT, ()=>{
    console.log("server is started on port 8000");
});
    // app.get("/users", (req, res)=>{
    //     const html = `
    //         <ul>
    //         ${users.map((user)=>`<li>${user.first_name}</li>`)}
    //         </ul>
    //     `;
    //     res.send(html)
    // })