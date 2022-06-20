const mongoose = require("mongoose")
const certSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    }
},

{
    timestamps: true,
}
)

const Cert= mongoose.model("Cert", certSchema)
module.exports = Cert
export{}