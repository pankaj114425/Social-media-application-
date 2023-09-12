 const express=require("express")
 const router=express.Router();
 const bcrypt=require('bcrypt');
 const User = require("../models/user");
  //update user 

  router.put("/:id", async(req,res)=>{
     if(req.body.userId===req.params.id || req.body.isAdmin){
       if(req.body.password){
        try{
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
        }catch(error){
            return res.status(500).json(error) 
        }
    }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,
                {$set:req.body});
                res.status(200).json("account has been updated")
        }
        catch(error){
            return res.status(500).json(error);
        }
     }
     else{
         return res.status(403).json("you can update only your account")
     }
  });
  //delete user 
  router.delete("/:id", async(req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
      
       try{
           const user = await User.findByIdAndDelete(req.params.id)
               
               res.status(200).json("account has been deleted successfully ")
       }
       catch(error){
           return res.status(500).json(error);
       }
    }
    else{
        return res.status(403).json("you can delete only your account")
    }
 })

  //get user
  router.get("/" ,async(req,res)=>{
    const userId=req.query.userId;
    const username=req.query.username;
      try {
          const user=userId ? await User.findById(userId)
          : await User.findOne({username:username });
          const{password,updatedAt,...other}=user._doc
          res.status(200).json(other)
      } catch (error) {
         res.status(500).json(error)
      }
  })
   
  //get friends

  router.get("/friends/:userId",async(req,res)=>{
    try {
         const user= await User.findById(req.params.userId);
         const friends=await Promise.all(
             user.followings.map(friendId=>{
                return User.findById(friendId)
             })
         )
         let friendsList=[];
         friends.map(friend=>{
            const{_id,username,profilePicture}=friend;
            friendsList.push({_id,username,profilePicture})
         })
         res.status(200).json(friendsList);
    } catch (error) {
         res.status(500).json(error);
    }
  })


  //follow a user 
  router.put("/:id/follow", async(req,res)=>{
    if(req.body.userId !== req.params.id){
       try {
        const user=await User.findById(req.params.id)
        const currentUser=await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId)){
             await user.updateOne({$push:{followers:req.body.userId}});
             await currentUser.updateOne({$push:{followings:req.params.id}});
              res.status(200).json("user has been followed");
            }else{
            res.status(403).json("you already follow this user")
        }
       } catch (error) {
          res.status(500).json(error)
       }
    }
    else{
        res.status(403).json("you can not follow youself");
    }

  })
  //unfollow a user
  router.put("/:id/unfollow", async(req,res)=>{
    if(req.body.userId !== req.params.id){
       try {
        const user=await User.findById(req.params.id)
        const currentUser=await User.findById(req.body.userId);
        if(user.followers.includes(req.body.userId)){
             await user.updateOne({$pull:{followers:req.body.userId}});
             await currentUser.updateOne({$pull:{followings:req.params.id}});
              res.status(200).json("user has been unfollowed");
            }else{
            res.status(403).json("you already unfollow this user")
        }
       } catch (error) {
          res.status(500).json(error)
       }
    }
    else{
        res.status(403).json("you can not unfollow youself");
    }

  })
 module.exports=router