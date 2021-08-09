const express = require('express')
const dotenv = require('dotenv')
const app = express();
const morgan = require('morgan')
const connectDB = require('./config/db')
const errorHandler = require("./middleware/errorHandler");

 app.use(express.json())


//  loading environmental variables

dotenv.config({ path: "./config/config.env"});


// mongoose set up

connectDB();

 // Dev logging middleware

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//  route files

const users = require("./routes/users");

// mount routes
app.use("/api/v1/users", users);
// error handling function
app.use(errorHandler);


// PORT CONFIG

 const PORT = process.env.PORT || 5000;




// handling cors issues


app.get("/", (req, res) => {
  res
    .set(
      "Content-Security-Policy",
      "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
    )
    .send("<html><head></head><body></body></html>");
});

const server = app.listen(PORT,()=>{
  console.log(
    `Server is listening in ${process.env.NODE_ENV} mode on port  ${PORT}`
  );
})




// handle unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`);


});
