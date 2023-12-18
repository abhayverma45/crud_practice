const {Sequelize,DataTypes}=require("sequelize");
const dotenv=require('dotenv')
// const process = require('process');
// const path = require('path');
 dotenv.config()
//  console.log("databse ",process.env.DATABASE);
const sequelize = new Sequelize(process.env.DATABASE,process.env.USERNAME,process.env.PASSWORD,{
    host:process.env.HOST,
    logging:false,
    dialect:'mysql'
})
try{
    sequelize.authenticate();
    console.log('connection has been made successfully')
}
catch(err){
    console.log('unable to connect with database :',err)
}
const db={};
db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.user=require("./user")(sequelize,DataTypes)
db.amount=require("./amount")(sequelize,DataTypes)
db.transaction=require("./transaction")(sequelize,DataTypes)
db.sequelize.sync({force:true})




module.exports=db;