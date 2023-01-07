const path = require('path');
const Details = require('../modals/detail');
//const rootdir = require('../util/path');

exports.AddDetails = async (req,res,next)=>{
    try {
      console.log("hiii");
      const name = req.body.name;
      
      const phone = req.body.phone;
      const email = req.body.email;
      
  
      if (!phone) {
          throw new Error('Phone-number is mendatory !')
      }
      const data = await Details.create({
          name : name,
          phone : phone,
          email : email
      })
  
      res.status(201).json({ newUserDetail: data });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}


exports.getDetails=async (req,res,next)=>{
    try{
        const Users = await Details.findAll();
       
        res.status(200).json({allUsers : Users});
    }catch(err) {
        console.log(err);
        res.status(500).json({error : err})
    }
}

exports.deleteUser = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await Details.findAll({where: {id:id}});
        if(!user){
            console.log('This user does not exist.');
            return res.sendStatus(400);
        }
        await Details.destroy({where: {id:id}});
        res.sendStatus(200);
        }catch(err){
            console.log(err);
            res.status(500).json({error : err})
        }
}
exports.editUser = async (req, res, next) => {
    try{
        
        const updatedname = req.body.name;
        const updatedphone = req.body.phone;
        const updatedemail = req.body.email;
        const id = req.params.id;

        Details.findAll({where:{id:id}}).then((detail=>{
            detail.id = id;
            detail.name = updatedname,
            detail.email=updatedemail,
            detail.phn=updatedphone
            detail.save();

        }))   
    }catch(err){
        console.log(err);
        res.status(500).json({error : err})
    }
}