const express=require('express');
const {clientEndPoint} = require('../config');
const router = express.Router();

router.get('/',(req,res)=>{
    res.set('Access-Control-Allow-Origin', clientEndPoint);
    res.send('server is up and running');
});

module.exports=router;
