// const jwt = require('jsonwebtoken');


// const veriftoken=(req,res,next)=>{
//   if(!req.headers.authorization){
//     return res.status(401).send({message:"unauthorised access"})
//   }
//   const token = req.headers.authorization.split(" ")[1];
//   // console.log(token)
//   jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
//     if(err){
//       return res.status(401).send({message:"token is invalid"})
//     }
//     req.decode = decode;
//     next();
//   })
// }

// module.exports = veriftoken
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Token is invalid" });
    }
    req.decoded = decoded; // Save decoded info (email) in the request
    next();
  });
};

module.exports = verifyToken;
