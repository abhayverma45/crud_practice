const { body, validationResult  } =  require("express-validator");
const CONSTANT=require("../../constant")
const postSignup = () => {

    
    return[
        body("mobile", "Please enter mobile")
            .exists()
            .trim()
            .notEmpty(),
        body("mobile", "Please enter only number")
            .exists()
            .matches(CONSTANT.REGX.Number),
        body("mobile", "Mobile number should be 10 digits")
            .exists()
            .trim()
            .isLength({min: 10, max: 10}),
         body("email", "Please enter a valid email address")
            .optional() // Making email field optional, as you are using mobile for login
            .isEmail()
    ]
};
const postSignin = () => {

    
    return[
        body("mobile", "Please enter mobile")
            .exists()
            .trim()
            .notEmpty(),
        body("mobile", "Please enter only number")
            .exists()
            .matches(CONSTANT.REGX.Number),
        body("mobile", "Mobile number should be 10 digits")
            .exists()
            .trim()
            .isLength({min: 10, max: 10}),
         body("email", "Please enter a valid email address")
            .optional() // Making email field optional, as you are using mobile for login
            .isEmail() 
    ]
};


const validate = (req, res, next) => {
    console.log("code is comming again");
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        
        return next()
        

    }
    return res.status(201).json({
        statusCode:201,
        status:false,
        message: errors.errors[0].msg,
    })
}


module.exports = {
   
    postSignup,
    validate,
    postSignin
   
};