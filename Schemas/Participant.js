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