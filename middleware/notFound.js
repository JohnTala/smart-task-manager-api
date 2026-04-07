module.exports=((req,res,next)=>{
    res.status(404).json({success:false,message:error.message || 'Route not Found'})
})