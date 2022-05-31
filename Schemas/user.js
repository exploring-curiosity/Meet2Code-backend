const  mongoose=require("mongoose");
mongoose.connect("mongodb+srv://sudharshan:neomaxborja@meet2code.o0mac.mongodb.net/Meet2Code?retryWrites=true&w=majority", {useNewUrlParser: true , useUnifiedTopology: true } ).then(result=>console.log("Connected to UserDB"))
.catch(error=>{
  console.log(error);
})

let userSchema=new mongoose.Schema({
    login:{type:String, required:true},
    socketId:{type:String, default:""},
    room:{type:mongoose.Schema.Types.ObjectId, ref:'rooms'},
    imageUrl:{type:String,default:""},
    oauth:{type:String}
})

let User=mongoose.model("users",userSchema)
module.exports=User