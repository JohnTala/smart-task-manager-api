
const User = require('../models/Task');

const getAllTasks=async (req,res)=>{
    try {
    const tasks = await User.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }

}

const createTask=async (req,res)=>{
    try {
    const task = new User(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }

}

const getSingleTask=async(req,res)=>{
    try {
    const task = await User.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }

}

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedTask = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'No Task found!'
      });
    }

    res.status(200).json(updatedTask);

  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      message: err.message || 'Invalid Data'
    });
  }
};


const deleteTask=async(req,res)=>{
 try{
      const id=req.params.id;
      const removedTask=await User.findByIdAndDelete(id);
      if(!removedTask){
        res.status(400).json({success:false,message:'No Task found'})
      }else{
        res.status(200).json({user:removedUser,message:'Task deleted!'})
      }

    }catch(err){
      console.logg(err)
      res.status(400).json({success:false,message:'No valid data'})
    }
}

module.exports={getAllTasks,getSingleTask,createTask,updateTask,deleteTask}