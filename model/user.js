const { user } = require(".");

module.exports=(sequelize,DataTypes)=>{


const User = sequelize.define('User', {
  // Model attributes are defined here
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
full_name: {
    type: DataTypes.STRING,
    allowNull: true,
},
display_name: {
    type: DataTypes.STRING,
    allowNull: true,
},
username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: {
        args: true,
        msg: "Username already in use!",
    },
},
email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: {
        args: true,
        msg: "Email address already in use!",
    },
},
mobile: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: {
        args: true,
        msg: "Mobile already in use!",
    },
},
password: {
    type: DataTypes.STRING,
    allowNull: true,
},
profile_image: {
  type: DataTypes.TEXT,
  allowNull: true,
},
}, {
    tableName: 'users'
  // Other model options go here
});
return User;

}