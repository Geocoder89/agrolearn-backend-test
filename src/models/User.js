const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true,'Please add first name']
  },

 lastName: {
    type: String,
    required: [true,'Please add last name']
  },


  email: {
    type: String,
    required: [true, "please add an email address"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },

  phoneNumber: {
    type: String,
    required: [true,'please fill in your phone number']
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 6,
    // this hides the password
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

})


//  encrpyt password with bcryptjs



userSchema.pre("save", async function (next) {
  // if the password is not modified we move to hashing a new password
  if (!this.isModified("password")) {
    next();
  }
  // to generate the salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



// to match user entered password to hashed password in  db


userSchema.methods.matchPassword = async function(enterPassword) {
  return await bcrypt.compare(enterPassword,this.password)
}


// export the model

module.exports = mongoose.model('User',userSchema)
