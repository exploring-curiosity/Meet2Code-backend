const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://sudharshan:neomaxborja@meet2code.o0mac.mongodb.net/Meet2Code?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(result=>console.log("Connected to DocumentDB"))
.catch(error=>{
  console.log(error);
});

const TestCaseSchema = new mongoose.Schema({

    input : {
        type : String,
        required : true
    },
    output : {
        type : String,
        required : true
    }

});

const QuestionSchema = new mongoose.Schema({

    contestId : {
        type:String,
        required:true
    },
    questionId : {
        type: String,
        required:true
    },
    testCases : [
        {
            type : TestCaseSchema,
            default : []
        }
    ]
});

let Question = mongoose.model("questions", QuestionSchema);
module.exports = Question