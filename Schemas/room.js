const  mongoose=require("mongoose");
mongoose.connect("mongodb+srv://sudharshan:neomaxborja@meet2code.o0mac.mongodb.net/Meet2Code?retryWrites=true&w=majority", {useNewUrlParser: true , useUnifiedTopology: true } ).then(result=>console.log("Connected to roomDB"))
.catch(error=>{
  console.log(error);
})

let roomSchema=new mongoose.Schema({
    roomId:{type:String,unique:true,required:true},
    name:{type:String,required:true},
    password:{type:String},
    startTime:{ type: Date, default: Date.now},
    description:{type:String},
    type:{type:String, default:"public"},
    participants:[{type:mongoose.Schema.Types.ObjectId, ref:'users'}],
    host:{type:mongoose.Schema.Types.ObjectId, ref:'users'}
})


let Room=mongoose.model("rooms",roomSchema)
module.exports=Room