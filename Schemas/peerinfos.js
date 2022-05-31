const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb+srv://sudharshan:neomaxborja@meet2code.o0mac.mongodb.net/Meet2Code?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
.then((res)=>{
  	console.log("Connected to PeerDB")
})
.catch((err)=>{
  	console.log(err)
})

const schema = mongoose.Schema
const peerSchema = new schema({
    username: {
        type: String,
        required: true
    },
    roomid: {
        type: String,
        required: true
    },
    peerid: {
        type: String,
        required: true
    },
    audioStatus: {
        type: Boolean,
        required: true
    },
    videoStatus: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

const Peer = mongoose.model('peer', peerSchema)

module.exports = Peer 