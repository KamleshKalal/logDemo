const mongoose = require('mongoose');
const connectDb =async(DB_URL)=>{
    const DB_OPT={
        dbName :"demodb"
    }
    return await mongoose.connect(DB_URL,DB_OPT).then(()=>{
        console.log("Connection is sussessful");
    }).catch(err=>{
        console.log("Error connecting:",err.message);
    });
}
module.exports = connectDb;
