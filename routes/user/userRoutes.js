const routes = require("express").Router();
const upload=require("../../utils/multer")
const authentication =require("../../middleware/auth")

const userCntrl=require("../../controller/usercontroller");
// const { postSignup,validate ,postSignin} = require("./validaters");


module.exports=()=>{
    routes.post("/profile_upadte",authentication, userCntrl.updateProfile);
    routes.post("/update_profile_image",authentication,upload.single("profile_image"),userCntrl.upadateImage)
    routes.post("/add_amount",authentication,userCntrl.addAmount)
    routes.get("/getprofile",authentication,userCntrl.getProfile)
    routes.post("/debit_amount",authentication,userCntrl.debitAmount)
    routes.post("/addBank_Details",authentication,upload.fields([{name:"pan_image"},{name:"adhar_image"}]),userCntrl.addUserBankDetails)


    
   
    return routes;
}