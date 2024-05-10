import express from 'express';

// to avoid error while connecting frontend with your backend install cors and use it 
// cors stands for cross origin  resource sharing which help us to  allow our front end app to make request to the server
// we will use cookies also so install cookie-parser and then import both in app.js
import cookieParser  from 'cookie-parser';
import  cors from 'cors';


const app= express()


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
})) // after you have installed the package add this line here

app.use(express.json({limit:'16kb'}))//when you get data from form  you will need this line
app.use(express.urlencoded({extended:true,limit:'16kb'}))//when you get data from url  you will need this line
app.use(express.static('public'))//when you want to keep images pdf on your own server or folder then it will be use
app.use(cookieParser())//it will use to access or to keep cookies on clients browser


// import routes
import userRoute from './routes/user.routes.js'

// declare routes

app.use('/api/v1/user',userRoute)



export {app}