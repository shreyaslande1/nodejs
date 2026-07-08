const User = require("../models/user")
async function handlegetallusers(req, res){
    const allUsers = await User.find({});

    return res.json(allUsers);
}

async function getusersbyid(req, res){
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json(user);
}

async function updateuserbyid(req,res){
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      status: "success",
      message: "User updated successfully",
      user,
    });
}

async function deleteuserbyid(req, res){
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      status: "success",
      message: "User deleted successfully",
    });
}

async function handlecreatenewuser(req, res){
    console.log("got it");
  console.log(req.body);

  const data = req.body;

  if (!data || !data.first_name || !data.last_name || !data.email) {
    return res.status(400).json({ 
      msg: "all fields are required" 
    });
  }

  const result = await User.create({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    gender: data.gender,
    jobTitle: data.jobTitle,
  });

  console.log("result", result);

  return res.status(201).json({ 
    msg: "success",
    id: result._id

  });
}
module.exports = {
    handlegetallusers,
    getusersbyid,
    updateuserbyid,
    deleteuserbyid,
    handlecreatenewuser,
}