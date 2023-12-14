const {Sequelize,DataTypes}=require("sequelize");

const sequelize = new Sequelize('temp','root','Abhay@356',{
    host:'localhost',
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
db.contact=require("./contact")(sequelize,DataTypes)
db.sequelize.sync({force:false})

db.user.hasOne(db.contact, {foreignKey:'user_id'
  });
db.contact.belongsTo(db.user);


module.exports=db;