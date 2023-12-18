const authRoutes = require('./auth/authRoutes');
const userRoutes=require("./user/userRoutes")

module.exports = (app) => {
    app.use((req, res, next) => {
       res.setHeader('Access-Control-Allow-Origin', '*');
       res.setHeader(
          'Access-Control-Allow-Methods',
          'GET,POST,DELETE,PUT,PATCH,OPTIONS'
       );
       res.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type,Authorization,token'
       );
       next();
    });

 app.use("/api/v1/auth", authRoutes(app));
 app.use("/api/v1/user", userRoutes(app));



}