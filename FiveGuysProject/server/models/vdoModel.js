const mongoose = require("mongoose")

const vdoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    desc:{
        type: String,
        required: true,
        trim: true
    },

},
{timestamps: true})

module.exports = mongoose.model("vdo", vdoSchema);