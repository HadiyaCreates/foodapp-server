// // get all the users

// const User = require("../model/User")

// const getAllUsers = async(req,res)=>{
//     try{
//        const users = await User.find({});
//        res.status(200).json(users);
//     }catch(error){
//         res.status(500).json({message:error.message})
//     }
// };

// // post a new user
// const createUser=async(req,res)=>{
//     const user = req.body;
//     const query = {email:user.email};
//     try{
//        const existingUser=await User.findOne(query);
//        if(existingUser){
//         return res.status(302).json({message:"User already exist!"});
//        }
//        const result = await User.create(user);
//        res.status(200).json(result);
//     }catch(error){
//         res.status(500).json({message:error.message})
//     }
// }

// // deleteUser
// const deleteUser = async(req,res)=>{
//     const userId = req.params.id;
//     try{
//         const deletedUser = await User.findByIdAndDelete(userId);
//         // if useris not found
//         if(!deleteUser){
//             return res.status(404).json({message:"user not found"});
//         }
//         res.status(200).json({message:"user deleted successfully"});

//     }catch(error){
//         res.status(500).json({message:error.message})
//     }
// }
// // get admin
// const getAdmin=async(req,res)=>{
//     const email = req.params.email;
//     const query = {email:email};
//     try{

//         const user = await User.find(query);
//         if(email!==req.decoded.email){
//             return res.status(403).send({message:"Forbidden access"})
//         }
//         let admin = false;
//         if(user){
//             admin = user?.role === "admin";
             
//         }
//         res.status(200).json({admin})

//     }catch(error){
//         res.status(500).json({message:error.message})
//     }
// }
// // make the admin
// const makeAdmin = async(req,res)=>{
//     const userId = req.params.id;
//     const {name,email,photoURL,role} = req.body;
//     try {
//         const updatedUser = await User.findByIdAndUpdate(userId,
//             {role:"admin"},
//             {new:true , runValidators:true});

//             if(!updatedUser){
//                 return res.status(404).json({message:"User not found"})
//             }
//             res.status(200).json(updatedUser);
        
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// }
// module.exports={
//     getAllUsers,
//     createUser,
//     deleteUser,
//     getAdmin,
//     makeAdmin,
// }
const User = require("../model/User");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const user = req.body;
    const query = { email: user.email };
    try {
        const existingUser = await User.findOne(query);
        if (existingUser) {
            return res.status(302).json({ message: "User already exists!" });
        }
        const result = await User.create(user);
        res.status(201).json(result); // Return 201 status code for successful creation
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get admin status
const getAdmin = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Check if the logged-in user is trying to access their own admin status
        if (email !== req.decoded.email) {
            return res.status(403).send({ message: "Forbidden access" });
        }

        const admin = user.role === "admin";
        res.status(200).json({ admin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Make user an admin
const makeAdmin = async (req, res) => {
    const userId = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role: "admin" },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    getAdmin,
    makeAdmin,
};
