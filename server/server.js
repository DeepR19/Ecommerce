const app =  require("./app");

const dotenv = require("dotenv");
const ConnDB = require("./config/db");

// add config file
dotenv.config({
    path: "./config/config.env"
});

// Connect DB
ConnDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log("Server is started on port: ",PORT)
})