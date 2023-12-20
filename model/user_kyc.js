

module.exports=(sequelize,DataTypes)=>{


const KycDetail = sequelize.define('kycDetail', {
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
pan_num: {
  type: DataTypes.STRING,
  allowNull:true

},
adhar_num: {
    type: DataTypes.STRING,
    allowNull: true,

},
pan_image:{
  type: DataTypes.STRING,
  allowNull: true,
},
adhar_image:{
    type:DataTypes.STRING,
    allowNull:true
}





}, {
    // tableName: 'amount'
  // Other model options go here
});
return KycDetail;

}