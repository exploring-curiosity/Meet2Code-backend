const express=require("express");
      router=express.Router();
      fetch=require("node-fetch");
      mongoose=require("mongoose");
      User=require("../Schemas/user");

const { gitConfig , serverEndPoint, clientEndPoint} = require("../config");

let getAccessToken=async(code)=>{
    try{
        let resp=await fetch('https://github.com/login/oauth/access_token?code='+code+'&client_id='+gitConfig.clientId+'&client_secret='+gitConfig.clientSecret,{
            method:"post",
            headers:{'Accept':'application/json'},
      })
        resp=await resp.json()
        return resp
    }
    catch(e){
        console.log(e," in getting access token")
    }
}


let getGitUser=async(access_token)=>{
    let resp=await fetch('https://api.github.com/user',{
        method:"get",
        headers:{'Authorization':'token '+access_token}
    })
    resp=await resp.json()
    return resp
}

router.get('/isloggedin',async(req,res)=>{
    res.set('Access-Control-Allow-Origin', clientEndPoint);
    if(req.session.loggedin===true){
        res.status(200).json({user:req.session.user, loggedin:true})
    }
    else 
        res.status(401).json({user:{},loggedin:false})
})

router.post('/logout',(req,res)=>{
    req.session.destroy();
    return res.json({message:"Logged out Successfully"})
})

router.get('/git',(req,res)=>{
    res.set('Access-Control-Allow-Origin', clientEndPoint);
    if(req.session.loggedin===true){        //If user is already loggedin redirect to loginPage
        return res.redirect(`${clientEndPoint}`)
    }
    return  res.redirect('https://github.com/login/oauth/authorize?client_id='+gitConfig.clientId+'&redirect_uri='+serverEndPoint+'/oauth/gitCallBack/getToken');
})

router.get('/gitCallBack/getToken',async(req,res)=>{
    
    res.set('Access-Control-Allow-Origin', clientEndPoint);
    let {code}=req.query
    try{
        let resp=await getAccessToken(code)
        req.session.access_token=resp.access_token
      
        //Request to get the authenticated user info
        resp=await getGitUser(resp.access_token)

        let user=await User.findOne({login:resp.login, oauth:"git"})
        // console.log(user)
        if(user===undefined || user===null){
            user=new User({
                login:resp.login,
                oauth:"git",
                imageUrl:resp.avatar_url
            })
            await user.save()
        }

        //Loggin the user in by creating session
        req.session.loggedin=true
        req.session.user={login:resp.login, imageUrl:resp.avatar_url, url:resp.url,_id:user._id}
        req.session.user.oauth='git'
      
    }
    catch(e){
        req.session.loggedin=false
        req.session.user={}
        console.log(e)
    }
    return res.redirect(`${clientEndPoint}`)
})

router.get('/gitCallBack/getRepos',async(req,res)=>{
    res.set('Access-Control-Allow-Origin', clientEndPoint);
    let {code}=req.query
    try{
        let resp=await getAccessToken(code)
        req.session.gitaccess={}
        req.session.gitaccess.repo_access_token=resp.access_token
        resp=await getGitUser(resp.access_token)
        req.session.gitaccess.login=resp.login
        return res.redirect(`${clientEndPoint}/room/${req.session.roomId}?repo_access_granted=true`)
    }
    catch(e){
        console.log(e)
        return res.redirect(`${clientEndPoint}/room/${req.session.roomId}?repo_access_granted=false`)
    }
})


router.get('/gitCallBack',(req,res)=>{
    res.set('Access-Control-Allow-Origin', clientEndPoint);
    let {code}=req.query
    if(code===undefined){
        return res.redirect(`${clientEndPoint}`)
    }
})

router.post('/google',async(req,res)=>{
    console.log(req.body);
    let user=await User.findOne({login:req.body.user.login, oauth:"google"})
    // console.log(user)
    if(user===undefined || user===null){
        user=new User({
            login:req.body.user.login,
            oauth:"google",
            imageUrl:req.body.user.imageUrl
        })
        await user.save()
    }
    req.session.loggedin=true
    req.session.user=req.body.user

    req.session.access_token=req.body.access_token
    req.session.user._id=user._id
    req.session.user.oauth='google'
    console.log(req.session);
    res.status(200).json({"message":"Success"})
})
module.exports=router