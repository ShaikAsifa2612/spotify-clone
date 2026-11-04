const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing");
const {isLoggedIn} = require("../middleware.js");

const validateListing=(req,res,next)=>{
 let {error}=listingSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,error);
    }else{
        next();
    }
}

/* -------------------------------
   LISTING ROUTES
-------------------------------- */

// INDEX ROUTE
router.get("/", wrapAsync(async (req, res) => {
  let listings = await Listing.find({});
  res.render("./listings/index.ejs", { listings });
}));

// NEW ROUTE
router.get("/new", isLoggedIn,(req, res) => {
  
   res.render("./listings/new.ejs");
});

// SHOW ROUTE
router.get("/:id",isLoggedIn, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id).populate("reviews");
  
  if(!listing){
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");   // ✅ STOP execution here
  }

  res.render("./listings/show.ejs", { listing });
}));


// CREATE ROUTE
router.post("/",validateListing,isLoggedIn, wrapAsync(async (req, res,next) => {
   
  let newListing = new Listing(req.body.listing);

  await newListing.save();
  req.flash("success","New Listing Created");
  res.redirect("/listings");
}));

// EDIT ROUTE
router.get("/:id/edit", isLoggedIn,wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!listing){
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }
  //if (!listing) throw new ExpressError(404, "Listing Not Found");
  res.render("./listings/edit.ejs", { listing });
}));

// UPDATE ROUTE
router.put("/:id", isLoggedIn,validateListing,wrapAsync(async (req, res) => {
    
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success","Listing Updated");
  res.redirect(`/listings/${id}`);
}));

// DELETE ROUTE
router.delete("/:id",isLoggedIn, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);

  console.log(deletedListing);
  req.flash("success","New Listing Deleted");
  res.redirect("/listings");
}));

module.exports=router;