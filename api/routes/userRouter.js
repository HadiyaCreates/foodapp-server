const express = require('express');
const router = express.Router();
const veriftoken = require("../middleware/verifyToken")
const verifyAdmin = require("../middleware/verifyAdmin")

const userController = require('../controllers/userController');
router.get("/",veriftoken,verifyAdmin,userController.getAllUsers);
router.post("/",userController.createUser);
router.delete('/:id',veriftoken,verifyAdmin,userController.deleteUser);
router.get('/admin/:email',veriftoken,userController.getAdmin);
router.patch('/admin/:id',veriftoken,verifyAdmin,userController.makeAdmin);
module.exports = router;