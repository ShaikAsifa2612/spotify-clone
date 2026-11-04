const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;
//console.log(passportLocalMongoose);

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
//console.log(typeof passportLocalMongoose);

// ✅ Apply plugin to the SCHEMA, not the model
UserSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model("User", UserSchema);
