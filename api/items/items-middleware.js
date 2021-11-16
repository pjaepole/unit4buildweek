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

module.exports={
    checkItemExist
}