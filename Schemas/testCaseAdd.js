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

const Question = require('./QuestionTestcase');

let addQuestion = async() => {

    let question = new Question({
        'contestId' : '468',
        'questionId' : 'B',
        'testCases' : [
            {
                input: '4 5 9\n2 3 4 5',

                output: 'YES\n0 0 1 1'
            },
            {
                input: '3 3 4\n1 2 4',
                output: 'NO'
            }
        ]
    });

    question = await question.save();
    console.log(question);

}

addQuestion();
