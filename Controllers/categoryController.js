const category=require("../Models/Category")



exports.getcategorybyid=(req, res, next, id)=>{
    category.findById(id).exec((err,cate)=>{
        if(err || !cate){
            return res.json({
                error:"No Catergory found"
            })
        }
       // console.log("ID-------------",user)
       req.category=cate;
        console.log(req.category)
        
    })
    next();
}

exports.getCategory=(req,res)=>{
    console.log("req.category,",req.category)
    return res.json(req.category)
}


exports.createcategory=(req,res)=>{
        const categoryData=new category(req.body);
        categoryData.save((err,category)=>{
            if(err){
                return res.json({
                    error:"cannot able to save"
                })
            }
            return res.json(category)
        })
}






exports.getAllcategory=(req,res)=>{
    category.find()
        .exec((err,catgeries)=>{
            if(err){
                return res.json({
                    error:"Cant show an catergies"
                })
            }
            return res.json(catgeries)
        })
}

exports.updatecategory=(req,res)=>{
    const category=req.category;
    category.name=req.body.name;
    category.save((err,updatecategory)=>{
            if(err){
                return res.json({
                    error:"updated is not successfull"
                })
            }
            return res.json(updatecategory)
    })
}

exports.deletecategory=(req,res)=>{
    const category=req.category;
    console.log("category--delete--"+category)
    category.remove((err,category)=>{
        if(err){
            return res.json({
                error:"Error occured while deteing the category"
            })
        }
        return res.json(category)
    })
}