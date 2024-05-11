const category=require("../Models/Category")



exports.getcategorybyid=(req,res,next,id)=>{
    Category.findById(id)
        .exec((err,cate)=>{
            if(err){
                return res.json({
                    error:"Category not found"
                })
            }
            req.category=cate;
        })
        next()
}

exports.createcategory=(req,res)=>{
    const category=new Category(req.body)
    category.save((err,category)=>{
        if(err){
            return res.json({
                error:"not able to save"
            })
        }
        return res.json(category)
    })
}

exports.getcategory=(req,res)=>{
    return res.json(req.category)
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