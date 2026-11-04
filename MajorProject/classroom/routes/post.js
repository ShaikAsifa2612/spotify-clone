const express = require("express");
const router = express.Router();


//POSTS

//Index
router.get("/",(req,res)=>{
    res.send("GET for posts");
})


//show -POSTS
router.get("/:id",(req,res)=>{
    res.send("Get for post id");
});

//Post
router.post("/",(req,res)=>{
    res.send("POST for posts");

})

//DELETE 

router.delete("/:id",(req,res)=>{
    res.send("Delete  post");
})

module.exports=router;