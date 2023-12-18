const routes = require("express").Router();

const userCntrl=require("../../controller/usercontroller");
const { postSignup,validate ,postSignin} = require("./validaters");


module.exports=()=>{
    routes.post("/register",postSignup(),validate, userCntrl.userSignUp);
    routes.post("/login",postSignin(),validate, userCntrl.userSignin);
   
    return routes;
}


