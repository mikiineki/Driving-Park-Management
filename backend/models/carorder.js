const mongoose = require('mongoose')

const carOrderSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    surname:{
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    startingLocation:{
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    finalLocation:{
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    from:{
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    to:{
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    }
    
}, {timestamps: true}
);

module.exports = mongoose.model("CarOrder", carOrderSchema);