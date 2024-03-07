import dotenv from 'dotenv'
import connectDb from './db/index.js'
import {app} from './app.js'



dotenv.config({
    path:'./env'
})
const port = process.env.PORT || 3000


connectDb().then(()=>{
    app.listen(port,()=>{
        console.log("server running  on port",port)
    })
    app.on('error', (err)=>{
        console.log(`Error occured ${err.message}`);
    });
})
.catch((err)=>{
    console.log('mongodb connection failed')
    throw err
})
