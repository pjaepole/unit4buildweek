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
        res.status(403).json({message:"Username is already taken"})
      }
    }
    catch(err){
      next(err)
    }
  }

  const checkUnExistLogin = async (req, res, next) => {
    try{
      const user=await Users.findBy({username: req.body.username})
      if(user){
        req.user=user
        next()
      } else {
        res.status(401).json({message:"Invalid Username or Password"})
      }
    }
    catch(err){
      next(err)
    }
  }
  module.exports = {
      providedUnPw,
      checkUnTakenRegister,
      checkUnExistLogin
  }