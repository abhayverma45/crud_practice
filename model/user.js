const { user } = require(".");

module.exports=(sequelize,DataTypes)=>{


const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    // get() {
    //   const rawValue = this.getDataValue('firstName');
    //   return rawValue ?'Mr '+ rawValue.toUpperCase() : null;
    // }
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull defaults to true
    // set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      // this.setDataValue('password', value+' indain');
    
   
  }
}, {
    tableName: 'users'
  // Other model options go here
});
return User;

}