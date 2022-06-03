const mongoose = require("mongoose");

const ConnDB =()=>{
    mongoose.connect( process.env.Mongo
        ,{
            useNewUrlParser: true, 
            useUnifiedTopology: true
            
    }).then(()=>{
        console.log("MONGO Done")
    })
}
module.exports  = ConnDB