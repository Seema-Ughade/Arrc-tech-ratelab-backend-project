const mongoose = require('mongoose');

function dbConnect(){
    try{
            mongoose.connect(process.env.MONGODB_URI)
            .then(()=>{
                console.log('Great connected with DB 😊')
            })
    }catch{
        console.log('Failed to Connect', error)
    }
}
module.exports = {dbConnect}; 

