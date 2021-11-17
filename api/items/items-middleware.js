const Items=require('./items-model')

const checkItemExist = async (req,res,next)=>{
    try{
        const item=await Items.findBy({item_id:req.params})
        if(item){
            req.removedItem=item
            next()
        } else {
            res.status(401).json({message:"item with that id does not exist"})
        }
    }
    catch(err){
        next(err)
    }
}
const checkIfTryingToChangeItemIdorUserId= (req,res,next)=>{
    if(req.body.item_id||req.body.user_id){
        res.status(422).json({message:"you can not change id"})
    } else {
        next()
    }
}
const checkifPriceisbelowzero=(req,res,next)=>{
    if(req.body.item_price<0){
        res.status(422).json({message:"price have to be more than 0"})
    } else {
        next()
    }
}
module.exports={
    checkItemExist,
    checkIfTryingToChangeItemIdorUserId,
    checkifPriceisbelowzero
}