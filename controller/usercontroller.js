
// const { where } = require("sequelize");
const db=require("../model")
const User=db.user;
const Amount=db.amount;
const Transaction=db.transaction;
const UserBankDetail=db.userbank;
const UserKycDetail=db.userkyc;
const sequelize=require("sequelize")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const upload=require("../utils/multer");
const { user } = require("../model");
const { check } = require("express-validator");


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
        // console.log("user datails-->",user)
    
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
            message: 'password does not matched',
          });
        }
    
        // Generate JWT token
        const token = jwt.sign({ userId: user.user_id, username: user.username }, "9889D22341540031D3386132A7BDD38F4830474543C795D019561C0A308F501A", { expiresIn: '1h' });
    // console.log(token)
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

    const upadateImage=async(req,res)=>{
      try {
        let user1 =req.user;
      let userId=user1.user_id;
      const imageFilename = req.file.filename;
    //  console.log(imageFilename)
      // const User = await User.findOne({
      //   where: { user_id: userId },
      // });
      if (!user1) {
        return res.status(401).json({
          statusCode: 401,
          status: false,
          message: 'user not find',
        });
      }

      // Prepare the fields to be updated
    const updatedFields = {
      profile_image: imageFilename || user.profile_image,
    };

        await user.update(updatedFields, { where: { user_id: userId } });
     
      res.status(200).json("successfully image");
        
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
        
      }
    },
    
    addAmount=async(req,res)=>{
      

     try {
      let user = req.user;
      let userId=user.user_id;

      // console.log(userId)
    
      const{amount}=req.body;
      const existingAmount = await Amount.findOne({ where: { Id: userId } });
      if (existingAmount) {
        // If the user already has an entry, update the existing record
      const  updatedAmount = await existingAmount.update({
        amount: Number(existingAmount.amount) + Number(amount),
        userid:userId,
      });
       
      const transactionId = uuidv4();
      // const transactionId = Date.now();
        
        const trans_history=await Transaction.create({
          userid:userId,
          transaction_id:transactionId,
           type:"credit",
          transaction_amt:amount})
        // console.log("history",trans_history);
       
        // res.status(200).json({updatedAmount,trans_history});
        res.status(200).json("transaction successful");

      }
      else {
        // If the user doesn't have an entry, create a new record
        const newAmount = await Amount.create({ userid:userId ,amount });
       
        const transactionId = uuidv4();
      

        const trans_history=await Transaction.create({
          userid:userId,
          transaction_id:transactionId,
          type:"credit",
          transaction_amt:amount
        })

        res.status(200).json("transaction successful");

      }
       
     } catch (error) {
       console.log(error)
       res.status(500).json({ error: 'Internal Server Error' });
     }
      
     
    }


    getProfile=async(req,res)=>{
    try {
      let user=req.user;
      let userId=user.user_id;
     
      // const userD = await User.findOne({
      //   where: { user_id: userId },
      // });
     
      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          status: false,
          message: 'user not found',
        });
      }
     
      const userDetails = await User.findAll({
        attributes:['user_id','full_name','display_name','username','email','mobile','profile_image'],
        
        include:[{
          model:Amount,
          attributes:['amount']
        }],
      where:{user_id:userId}
      });
      // Flatten the structure
const flattenedDetails = userDetails.map(user => {
  const { amount, ...userData } = user.toJSON(); // Extract amount and other user details
  return { ...userData, ...amount }; // Merge user details and amount
});

res.status(200).json(flattenedDetails);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
      
    }
    }

    // debit amount API

   debitAmount=async(req,res)=>{
     try {
      let user=req.user;
      let userId=user.user_id;

      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          status: false,
          message: 'user not found',
        });
      }
      const { amount } = req.body;
      const existingAmount = await Amount.findOne({ where: { Id: userId } });
      if (existingAmount && existingAmount.amount >= amount) {
        // If the user has enough balance, proceed with the debit
        const updatedAmount = await existingAmount.update({
          amount: Number(existingAmount.amount) - Number(amount),
        });
  
        const transactionId = uuidv4();
  
        const trans_history = await Transaction.create({
          userid: userId,
          transaction_id: transactionId,
          type: "debit",
          transaction_amt: amount,
        });
        res.status(200).json("transaction successful");
      }
      
      else {
        res.status(400).json({ error: 'Insufficient balance' });
      }

    
       
     } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
       
     }

}

addUserBankDetails=async(req,res)=>{
try {
 
 
  let user=req.user;
  
  let Id=user.user_id;
  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      status: false,
      message: 'user not found',
    });
  }

    const{bank_name,account_no,IFSC_code,pan_num,adhar_num,pan_image,adhar_image}=req.body;

    const hashedaccount = await bcrypt.hash(account_no, 8);
    const hashedIFSE=await bcrypt.hash(IFSC_code,8)
    const hashedpan = await bcrypt.hash(pan_num,8);
    const hashedadhar = await bcrypt.hash(adhar_num,8);
    const existingUser = await UserBankDetail.findOne({ where: { user_id:Id } });
    if (existingUser) {
      return res.status(401).json({
        statusCode: 401,
        status: false,
        message: 'you already added the bank details',
      });
    } 
  const check=req.files.pan_image;
  console.log("chhhh",check)
  console.log(check)
   if(check){
    const imageFilename_pan = req.files.pan_image[0].filename;
    const imageFilename_adhar = req.files.adhar_image[0].filename;
    const newuserbankdetail = await UserBankDetail.create({user_id:Id,bank_name,account_no:hashedaccount,IFSC_code:hashedIFSE});
    const newuserkyc = await UserKycDetail.create({user_id:Id,pan_num:hashedpan,adhar_num:hashedadhar,pan_image:imageFilename_pan,adhar_image:imageFilename_adhar});
    return res.status(201).json({
      statusCode: 201,
      status: true,
      message: 'User registered successfully',
      data:{newuserbankdetail,newuserkyc}
    });
   }
   else{
    const newuserbankdetail = await UserBankDetail.create({user_id:Id,bank_name,account_no:hashedaccount,IFSC_code:hashedIFSE});
    const newuserkyc = await UserKycDetail.create({user_id:Id,pan_num:hashedpan,adhar_num:hashedadhar,pan_image:pan_image,adhar_image:adhar_image});
    return res.status(201).json({
      statusCode: 201,
      status: true,
      message: 'User registered successfully',
      data:{newuserbankdetail,newuserkyc}
    });
   }
  
    
    
   
  
} catch (error) {
  console.log("error :",error);
  res.status(500).json('internal server error')
}
}


    
   


module.exports={
    userSignUp,
    userSignin,
    updateProfile,
    upadateImage,
    addAmount,
    getProfile,
    debitAmount,
    addUserBankDetails
}