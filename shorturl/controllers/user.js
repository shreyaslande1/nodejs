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

    const token = setUSer(person);
    // res.cookie("uid", token);
    return res.json({ token })
}
module.exports = { handleUserSignup,handleUserLogin };