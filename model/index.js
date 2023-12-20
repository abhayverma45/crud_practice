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
db.userbank=require("./user_bank")(sequelize,DataTypes)
db.userkyc=require("./user_kyc")(sequelize,DataTypes)

db.user.hasOne(db.amount,{foreignKey:'userid'});
db.amount.belongsTo(db.user,{foreignKey:'userid'})


db.sequelize.sync({force:false})




module.exports=db;