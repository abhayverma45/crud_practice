
const { user } = require(".");

module.exports=(sequelize,DataTypes)=>{


const Amount = sequelize.define('amount', {
  // Model attributes are defined here
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
userid:{
  type:DataTypes.INTEGER,
  allowNull:true
},
amount: {
    type: DataTypes.INTEGER,
    allowNull: true,
},


}, {
    // tableName: 'amount'
  // Other model options go here
});


return Amount;

}