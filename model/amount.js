
const { user } = require(".");

module.exports=(sequelize,DataTypes)=>{


const Amount = sequelize.define('amount', {
  // Model attributes are defined here
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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