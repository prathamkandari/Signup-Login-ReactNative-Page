const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongo_url).then(
    () => {
        console.log('Database connection established');
    }
)
.catch((err)=>{
    console.log(`Could not connect to db ` +err);
})
