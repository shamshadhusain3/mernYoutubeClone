// file uploadFileOnCloudinary: 
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

        //   configuration

cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_APIKEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET 
});


const uploadFileOnCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        // upload file on cloudinary
        const respones= await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        })
        // file has been uploaded successfully , we will send back the url of the image
        // console.log('file has been uploaded',respones.url);
        fs.unlinkSync(localFilePath);// delete local file after it's been uploaded to clodinary server
        return respones;

    } catch(error) {
        fs.unlinkSync(localFilePath)//removes the locally saved file as the upload operation failed
        return null
    }
}




export {uploadFileOnCloudinary}



 