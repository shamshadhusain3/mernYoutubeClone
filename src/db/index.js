import mongoose from 'mongoose';




const connectDb=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log('mongodb connected  on',connectionInstance.connection.host);
    } catch(error) {
        console.error(error);
        throw error;
    }
}

// goto utils there is a wrapper function which we will use alott

export default connectDb