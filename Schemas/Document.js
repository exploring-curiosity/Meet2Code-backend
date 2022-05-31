const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://sudharshan:neomaxborja@meet2code.o0mac.mongodb.net/Meet2Code?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(result=>console.log("Connected to DocumentDB"))
.catch(error=>{
  console.log(error);
})

const Document = new mongoose.Schema({
  _id: String,
  data: Object,
})

module.exports = mongoose.model("Document", Document)