const asynchandler=(reqHandler)=>{
   return (req,res,next)=>{
        Promise.resolve(reqHandler(req,res,next)).catch((err)=>next(err))
    }
}


// wrapping a function which we will use alott
// second method 

// const asyncHandler=(fn)=> async (req,res,next)=>{
    //     try {
        
        //     } catch(err) {
            //         res.status(err.code || 500).json({
                //             success:false,
                //             message:err.message
                //         })
                //     }
                // }
                
                export {asynchandler}