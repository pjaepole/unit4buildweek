const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../secrets/index')

module.exports=(req,res,next)=>{
    const token = req.headers.authorization
    if(!token){
        return next({ status: 401, message: 'token is required in the headers.authorization'})
    }
    jwt.verify(token, JWT_SECRET, (err, decodedToken)=>{
        if(err){
            next({ 
            status:401,
            message: "Token is Invalid"})}
        else{
            req.decodedToken=decodedToken
            next()
        }
    })
}