const Users= require('./users-model')

const providedUnPw = (req,res,next)=>{
    if(!req.body.username || !req.body.password){
        res.status(401).json({message:"username and password required"})
    } else {
        next()
    }
}

const checkUnTakenRegister = async (req, res, next) => {
    try{
      const user=await Users.findBy({username: req.body.username})
      if(!user){
        next()
      } else {
        res.status(403).json({message:"username taken"})
      }
    }
    catch(err){
      next(err)
    }
  
  }

  module.exports = {
      providedUnPw,
      checkUnTakenRegister
  }