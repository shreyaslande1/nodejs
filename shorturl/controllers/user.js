const user = require("../models/user");
const { v4: uuidv4} = require("uuid")
const { setUSer } = require("../service/auth")
async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    await user.create({
        name,
        email,
        password,
    });
    return res.redirect("/")
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    const person = await user.findOne({email, password});
    if(!person){
        return res.render("login",{
            error: "invalid user or password",
        })
    }
    const sessionId = uuidv4();
    setUSer(sessionId, person);
    res.cookie("uid", sessionId);
    return res.redirect("/")
}
module.exports = { handleUserSignup,handleUserLogin };