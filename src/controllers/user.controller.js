import {asynchandler} from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js'
import ApiResponse from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import {uploadFileOnCloudinary} from '../utils/cloudinary.js'
const registerUser= asynchandler(async (req,res)=>{
//  get user details from fontend
// validation - not enpty
// check if user already exists:username,email
// check form image,check for avatar
// upload them to cloudinary,avatar
// create user object - create entry in db
// remove password and refresh token field from response 
// check for user creation
// return response

const {fullName,email,username,password}=req.body
console.log(fullName)
// validation

if (fullName===''|| email === "" || username==='' || password==='') {
    
        throw new ApiError(400,"All fields are required")

}

// if(
//     [fullName,email,username,password].some((field)=>field?.trim()==="")
//     ){
      
//         // throw new ApiError(400,"All fields are required")
//     }


// check user already exist
const userExist= await User.findOne({
    $or:[{email}, {username}]
})
if (userExist) {

    throw new ApiError(409,'user already exists')
    
}
 
// check avtar 
const avatarLocalPath = req.files?.avatar[0]?.path 
console.log(avatarLocalPath,'avatar')
const coverImageLocalPath=req.files?.coverImage[0].path

if(!avatarLocalPath){
    throw new ApiError(400,'Avatar file is required')
}
const avatar= await uploadFileOnCloudinary(avatarLocalPath)
const coverImage= await uploadFileOnCloudinary(coverImageLocalPath)


if (!avatar){
    throw new ApiError(400,'error while uploading file')

}

 const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    username:username.toLowerCase(),
    password
})
const createdUser =await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(500,'something went wrong while registering the user')

}

return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
)


})




export {
    registerUser,
}