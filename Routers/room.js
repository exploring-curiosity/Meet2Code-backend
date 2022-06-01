const express=require("express");
      router=express.Router();
      fetch=require("node-fetch");
      const { v4: uuidv4 } = require('uuid');
      socket=require("socket.io");
      Room=require("../Schemas/room");
      User=require("../Schemas/user")


const { gitConfig , serverEndPoint, clientEndPoint} = require("../config");


//Get room info
router.get('/:id',async(req,res)=>{

    res.set('Access-Control-Allow-Origin', clientEndPoint);
    let roomId=req.params.id
    let {user}=req.session
    let room=await Room.findOne({roomId:roomId})

    if(room===null || room===undefined)
        res.status(404).json({"msg":"Room doesn't exist or has ended"});
    else
        res.status(200).json({user:user, room:room})

})

module.exports=router