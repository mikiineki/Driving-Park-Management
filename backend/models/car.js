const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const carSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    chassis:{
        type: Number,
        trim: true,
        required: true,
        maxlength: 50
    },
    engine:{
        type: Number,
        trim: true,
        required: true,
        maxlength: 50
    },
    enginePower:{
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    fuel:{
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    year:{
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    category:{
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    photo:{
        data: Buffer,
        contentType: String
    }
    
}, {timestamps: true}
);

module.exports = mongoose.model("Car", carSchema);