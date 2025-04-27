// const jwt = require('jsonwebtoken');
// // const user = require('../model/User');
// const User = require('../model/User');
// const verifyAdmin = async(req,res,next)=>{
//     const email = req.decoded.email;
//     const query = {email:email};

//     const user = await User.findOne(query);
//     const isAdmin = user?.role==='admin';

//     if(!isAdmin){
//         return res.status(403).send({message:"forbidden access"});

//     }
//     next();
// };
// module.exports=verifyAdmin
const User = require('../model/User');

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email; // We set this in verifyToken
  try {
    const user = await User.findOne({ email });

    if (!user || user.role !== 'admin') {
      return res.status(403).send({ message: "Forbidden: Admin only" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = verifyAdmin;
