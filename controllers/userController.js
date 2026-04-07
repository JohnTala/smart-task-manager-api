
const User = require('../models/User');

const getAllUsers=async (req,res)=>{
    try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }

}

const createUser=async (req,res)=>{
    try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }

}

const getSingleUser=async(req,res)=>{
    try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }

}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'No user found!'
      });
    }

    res.status(200).json(updatedUser);

  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      message: err.message || 'Invalid Data'
    });
  }
};


const deleteUser=async(req,res)=>{
 try{
      const id=req.params.id;
      const removedUser=await User.findByIdAndDelete(id);
      if(!removedUser){
        res.status(400).json({success:false,message:'No user found'})
      }else{
        res.status(200).json({user:removedUser,message:'User deleted!'})
      }

    }catch(err){
      console.logg(err)
      res.status(400).json({success:false,message:'No valid data'})
    }
}

module.exports={getAllUsers,getSingleUser,createUser,updateUser,deleteUser}