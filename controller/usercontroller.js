
// const { where } = require("sequelize");
const db=require("../model")
const User=db.user;
const Amount=db.amount;
const Transaction=db.transaction;
const sequelize=require("sequelize")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

console.log("abhay");

const userSignUp=async(req,res)=>{

    try {
        const{full_name,display_name,username,email,mobile,password,profile_image}=req.body;

       // Check if mobile email already exists
    const existingUser = await User.findOne({
        where: {
          [sequelize.Op.or]: [
            { email: email }
          ]
        }
      });
  
      if (existingUser) {
        return res.status(400).json({
          statusCode: 400,
          status: false,
          message: ' email already exists',
        });
      }
        // Check if mobile number already exists
    const existing = await User.findOne({
        where: {
          [sequelize.Op.or]: [
            { mobile: mobile },
           
          ]
        }
      });
  
      if (existing) {
        return res.status(400).json({
          statusCode: 400,
          status: false,
          message: 'Mobile number already exists',
        });
      }

       // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({full_name,display_name,username,email,mobile,password:hashedPassword,profile_image});
        return res.status(201).json({
            statusCode: 201,
            status: true,
            message: 'User registered successfully',
            data: newUser,
          });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Internal Server Error',
          });
    }
    
}

// login api

const userSignin=async(req,res)=>{
    try {
        const { mobile, password } = req.body;

        const user = await User.findOne({
          where: { mobile: mobile },
        });
    
        if (!user) {
          return res.status(401).json({
            statusCode: 401,
            status: false,
            message: 'Invalid credentials',
          });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
          return res.status(401).json({
            statusCode: 401,
            status: false,
            message: 'Invalid credentials',
          });
        }
    
        // Generate JWT token
        const token = jwt.sign({ userId: user.user_id, username: user.username }, "9889D22341540031D3386132A7BDD38F4830474543C795D019561C0A308F501A", { expiresIn: '1h' });
    
        return res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Login successful',
          data: {
            token: token,
          },
        });
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Internal Server Error',
        });
      }
    }

    const   updateProfile = async (req, res) => {
      try {
        
      
        let user = req.user;
        // console.log(user)
        const {
          full_name,
          display_name,
          username,
          email,
          mobile,
          password,
          profile_image,
        } = req.body;
    
        // Fetch the user from the database
        // const user = await User.findByPk(userId);
        // console.log("userid--->", userId)
    
        // Check if the user exists
        if (!user) {
          return res.status(404).json({
            statusCode: 404,
            status: false,
            message: 'User not found',
          });
        }
    
        // Prepare the fields to be updated
        const updatedFields = {
          full_name: full_name || user.full_name,
          display_name: display_name || user.display_name,
          username: username || user.username,
          email: email || user.email,
          mobile: mobile || user.mobile,
          profile_image: profile_image || user.profile_image,
        };
    
        // Update password if provided
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          updatedFields.password = hashedPassword;
        }
    
        // Use Sequelize update method to update the user profile
        await user.update(updatedFields);
    
        return res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'User profile updated successfully',
          data: user,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Internal Server Error',
        });
      }
    };

    const upadateImage=(req,res)=>{

      res.status(200).json("updated");
      // try {
      //   let user = req.user;
      // const {profile_image}=req.body;

      //  // Check if the user exists
      //  if (!user) {
      //   return res.status(404).json({
      //     statusCode: 404,
      //     status: false,
      //     message: 'User not found',
      //   });
      // }

      // const updatedFields = {
        
      //   profile_image: profile_image || user.profile_image,
      // };
      // // Use Sequelize update method to update the user profile
      // await user.update(updatedFields);
      // return res.status(200).json({
      //   statusCode: 200,
      //   status: true,
      //   message: 'User profile updated successfully',
      //   data: user,
      // });
      
        
      // } catch (error) {
      //   console.error(error);
      //   return res.status(500).json({
      //     statusCode: 500,
      //     status: false,
      //     message: 'Internal Server Error',
      //   });
        
      // }
      
     
    },
    
    addAmount=async(req,res)=>{
      

     try {
      let user = req.user;
      let userId=user.user_id;

      // console.log(userId)
    
      const{amount}=req.body;
      const existingAmount = await Amount.findOne({ where: { user_id: userId } });
      if (existingAmount) {
        // If the user already has an entry, update the existing record
      const  updatedAmount = await existingAmount.update({
        amount: Number(existingAmount.amount) + Number(amount),
      });
       
      const transactionId = uuidv4();
      // const transactionId = Date.now();
        
        const trans_history=await Transaction.create({
          userid:userId,
          transaction_id:transactionId,
           type:"credit",
          transaction_amt:amount})
        // console.log("history",trans_history);
       
        res.status(200).json({updatedAmount,trans_history});
      }
      else {
        // If the user doesn't have an entry, create a new record
        const newAmount = await Amount.create({ user_id: userId, amount });
       
        const transactionId = uuidv4();
      

        const trans_history=await Transaction.create({
          userid:userId,
          transaction_id:transactionId,
          type:"credit",
          transaction_amt:amount
        })

        res.status(200).json({newAmount,trans_history});

      }
      // const history=amount;
      
       

      // const newAmount = await Amount.create({ user_id: userId, amount });
      // res.status(201).json(newAmount);
       
     } catch (error) {
       console.log(error)
       res.status(500).json({ error: 'Internal Server Error' });
     }
      
     
    }
   


module.exports={
    userSignUp,
    userSignin,
    updateProfile,
    upadateImage,
    addAmount
}