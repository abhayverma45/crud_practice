const routes = require("express").Router();
const upload=require("../../utils/multer")
const authentication =require("../../middleware/auth")

const userCntrl=require("../../controller/usercontroller");
// const { postSignup,validate ,postSignin} = require("./validaters");


module.exports=()=>{
    routes.post("/profile_upadte",authentication, userCntrl.updateProfile);
    routes.post("/update_profile_image",authentication,upload.single("profile_image"),userCntrl.upadateImage)
    routes.post("/add_amount",authentication,userCntrl.addAmount)
    
   
    return routes;
}