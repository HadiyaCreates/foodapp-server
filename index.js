const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// console.log(process.env.ACCESS_TOKEN_SECRET)

// middlewares
app.use(cors({
  origin: ['https://foodapp-server-myfu.onrender.com'], // replace 'your-frontend-url.com' with your frontend URL
  credentials: true,
}));
app.use(express.json());

// const connect = require('../mongoc')
// mongodb config
// hadiyashaikh2006
// F0rd26Ls7i9isRZY
// DB_USER="hadiyashaikh2006"
// DB_PASSWORD="F0rd26Ls7i9isRZY"
console.log(process.env.DB_USER, process.env.DB_PASSWORD);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cmnzuf2.mongodb.net/foodappdb?retryWrites=true&w=majority`)
  .then(() => console.log("success"))
  .catch((error) => console.log("error connecting to mongodb", error));

// jwt authentication
app.post("/jwt",async(req,res)=>{
  const user = req.body;
  const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:"1hr",  
  });
  res.send({token});
})
// middlewares
const veriftoken=(req,res,next)=>{
  if(!req.headers.authorization){
    return res.status(401).send({message:"unauthorised access"})
  }
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token)
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
    if(err){
      return res.status(401).send({message:"token is invalid"})
    }
    req.decode = decode;
    next();
  })
}
// import routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes =require('./api/routes/userRouter')
const paymentRoutes = require('./api/routes/paymentRoutes');
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use('/users',userRoutes)
app.use('/payments',paymentRoutes)

// stripe payment routes
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.get("/",(req, res) => {
  res.send("Hello World this is foodapp!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
