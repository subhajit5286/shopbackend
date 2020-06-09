import express from 'express';
import data from './data';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

dotenv.config();
const mongodbUrl=config.MONGODB_URL;
mongoose.connect(mongodbUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch((error) => console.log(error.reason));



const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});
app.get('/',(req,res)=>{
  res.send('Hello');
})

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
})


// app.get("/api/products",(req,res)=>{
//     res.send(data.products);
// })
// app.get("/api/products/:id",(req,res)=>{
//   const productId = req.params.id;
// const product = data.products.find(x=>x._id===productId);
// if(product)
//   res.send(product);
//   else
//   res.status(404).send({msg:"product not found"})
// })
var port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("Server started at http://localhost:5000")
})