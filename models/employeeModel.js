const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema ({
    firstName:{
        type: String,
        required: true,
        trim: true, //removes unncessary white spaces
    },
    lastName:{
        type: String,
        trim: true
    },
    
    age:{
        type: Number
    },
    email:{
        type: String,
        unique:true //it won't save an email more than once
    },
    telephone:{
        type: String
    },
    gender:{
        type: String
    }
})

module.exports = mongoose.model("Employee",EmployeeSchema);
