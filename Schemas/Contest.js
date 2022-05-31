const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://sudharshan:neomaxborja@meet2code.o0mac.mongodb.net/Meet2Code?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(result=>console.log("Connected to ContestDB"))
.catch(error=>{
  console.log(error);
});

let participantSchema = new mongoose.Schema({
    participant : {
        type:mongoose.Schema.Types.ObjectId, 
        ref:'users'
    },
    score : {
        type:Number, 
        default:0
    }
});

let contestSchema=new mongoose.Schema({
    contestId:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        unique:true,
        required:true
    },
    startTime:{ 
        type: Date, 
        default: Date.now
    },
    host:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'users'
    },
    participants:[
        {
           type : participantSchema,
           default : []
        }
    ],
    status : {
        type:String,
        default: 'not started'
    },
    questions : [
        {
            type : String
        }
    ]
})


let Contest=mongoose.model("contests",contestSchema)
module.exports=Contest