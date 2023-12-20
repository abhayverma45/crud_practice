

module.exports=(sequelize,DataTypes)=>{


const BankDetail = sequelize.define('bankDetail', {
  // Model attributes are defined here

Id:{
  type:DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true,
},

user_id:{
  type:DataTypes.INTEGER,
  allowNull:true
},
bank_name:{
    type: DataTypes.STRING,
    allowNull: true,
  },
account_no: {
  type: DataTypes.STRING,
  allowNull:true

},
IFSC_code: {
    type: DataTypes.STRING,
    allowNull: true,

}

}, {
   
});
return BankDetail;

}