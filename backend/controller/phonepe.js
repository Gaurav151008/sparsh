// cashfreeController.js
// import axios from 'axios';
const axios = require('axios');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { options } = require('../routes/phonepe');
require("dotenv").config();



class phonepeController {

  async getOrderId(req,res){
    console.log("hit2");
    try{  
      var instance = new Razorpay({ key_id: process.env.CLIENT_ID, key_secret: process.env.SECRET_KEY })

      var options = {
        "amount": req.body.amount * 100,
        "currency": "INR",
        "receipt": "txn" + Date.now(),
        "partial_payment": false,
        "notes": {
          key1: req.body.name,
          key2: req.body.email,
          key3: req.body.number,
          key4: req.body.address,
          key5: req.body.product,
          key6: req.body.profile_name,
        }
      };
      instance.orders.create(options, function(err,order) {
        if(order){
          return res.send(order.id);
        }
        else{
          console.log(err);
        }
      });

    }
    catch(err){
      console.log(err);
    }
  }

  async paymentCallback(req,res){
    console.log("hit3");
    const {razorpay_signature, razorpay_payment_id, razorpay_order_id} = req.body;
    console.log(req.body);
    
    try{
      const string = `${razorpay_order_id} | ${razorpay_payment_id}`;
      const generated_signature = crypto.createHmac('sha256',process.env.SECRET_KEY).update(string).digest('hex');
      
      console.log(generated_signature);
      if(generated_signature == razorpay_signature){
        console.log('payment succesfull');
        return res.redirect('http://localhost:3000')
      }
    }
    catch(error){
      console.log(error.message);
    }
  }

  async paymentCancel(req,res){
    try{
      console.log("failed");
    }
    catch(error){
      console.log(error.message);
    }
  }

}

module.exports = new phonepeController();