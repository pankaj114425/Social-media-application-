const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt=require('bcrypt');

// Register a new user
router.post("/register", async (req, res) => {
      
       
      
       try {
        //generate new password 
          const salt =await bcrypt.genSalt(10);
          const hashpassword=await bcrypt.hash(req.body.password,salt)

           //create new user 
          const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashpassword,
            
           });
           //save new user 
           
           const user=await newUser.save();
           res.status(200).json({user})
       } catch (error) {
        
        res.status(500).json(error)

        
       }
});

//LOGIN

// router.post('/login',async(req,res)=>{
//     try {
//         const user =await User.findOne({email:req.body.email});
//      !user && res.status(404).json("user not found")
//       const validpassword=await bcrypt.compare(req.body.password,user.password)
//       !validpassword && res.status(404).json("wrong password")

//       res.status(200).json(user);
//     } catch (error) {
//        res.status(500).json({error})
        
       
//     }
// 
// })

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // Send a 401 status code (Unauthorized) if the user is not found
      return res.status(401).json("User not found");
    }
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
   
    if (!validPassword) {
      // Send a 401 status code (Unauthorized) if the password is wrong
      return res.status(401).json("Wrong password");
    }

    // Send a 200 status code (OK) along with the user data
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});


module.exports = router;
