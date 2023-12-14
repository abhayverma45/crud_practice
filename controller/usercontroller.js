
// const { where } = require("sequelize");
const db=require("../model")
const User=db.user;
const Contact=db.contact;

const adduser=async(req,res)=>{

    const jane = await User.create({ firstName: "abhay",lastName:"verma"});
    // const jane = User.build({ firstName: "anshu",lastName:"verma" });
console.log(jane instanceof User); // true
console.log(jane.name); // "Jane"

// jane.set({ firstName: "sudha",lastName:"vermaf"})
// await jane.update({ firstName: "su",lastName:"ver"})
await jane.save();
console.log('Jane was saved to the database!');
// await jane.destroy();
console.log(jane.toJSON()); // This is good!
res.status(200).json(jane.toJSON())
}
const getusers=async(req,res)=>{
    const data = await User.findAll({});
    res.status(200).json({data:data}) 
}
const getuser=async(req,res)=>{
    const data = await User.findOne({
        where:{
            id:req.params.id
        }
    });
   
    res.status(200).json({data:data}) 
}

const postuser=async(req,res)=>{
    const postdata=req.body
    if(postdata.length>1){
        var data=await User.bulkCreate(postdata);
    }
    else{
        var data=await User.create(postdata);
    }
    
    res.status(200).json({data:data})

}

const deleteuser=async(req,res)=>{
    const data = await User.destroy({
        where:{
            id:req.params.id
        }
    });
   
    res.status(200).json({data:data}) 
}
const updateuser=async(req,res)=>{
    var dataupdates=req.body
    const data = await User.update(dataupdates,{
        where:{
            id:req.params.id
        }
    });
   
    res.status(200).json({data:data}) 
}

const findersuser=async(req,res)=>{
    const data= await User.findAll({
        where:{
            lastName:"pandey"
        }
    })
    res.status(200).json({data:data})
}

const getsetuser=async(req,res)=>{
// const data=await User.findAll({
//     where:{
//         lastName:"verma"
//     }
// })
const data=await Contact.create({
    permanent_add:"sneha",
    local_add:"gupta",
    user_id:"3"
})
res.status(200).json({data:data})
}

const getonetoone=async(req,res)=>{
// var data=await User.create({firstName:"abh",lastName:"ver"})

// if(data && data.id){
//     await Contact.create({permanent_add:"bbk",local_add:"lovgg",user_id:data.id})
// }
var data= await User.findAll({
    attributes:['firstName','lastName'],
    include:[{
     model:Contact,
     attributes:['permanent_add','local_add']
    }
    ]
})
res.status(200).json({data:data})
}



module.exports={
    adduser,
    getusers,
    getuser,
    postuser,
    deleteuser,
    updateuser,
    findersuser,
    getsetuser,
    getonetoone

}