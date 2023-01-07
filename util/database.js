const Sequelize = require('sequelize');
const sequelize = new Sequelize('mydatabase','root','navneet',{
  dialect :'mysql',
  host:'localhost'
});

module.exports=sequelize;