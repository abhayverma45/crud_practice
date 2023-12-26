const { user } = require(".");
const {Sequelize}=require("sequelize");

module.exports=(sequelize,DataTypes)=>{


const TransactionDetail = sequelize.define('transaction', {
  // Model attributes are defined here

order_id:{
  type: Sequelize.INTEGER,
  autoIncrement: true,
  primaryKey: true,
},

userid:{
  type:DataTypes.INTEGER,
  allowNull:true
},
transaction_id: {
  type: DataTypes.STRING,
  allowNull:true

},
type: {
    type: DataTypes.STRING,
    allowNull: true,

},
transaction_amt:{
  type: DataTypes.INTEGER,
  allowNull: true,
}

}, {
    // tableName: 'amount'
  // Other model options go here
});
return TransactionDetail;

}