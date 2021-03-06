const asyncHandler = require("../middleware/async");
const ErrorResponse = require('../utils/errorResponse')
const User = require("../models/User");

// get all users

// route GET 'api/v1/users

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users =  await User.find({});
 return res.status(200).json({
    success: true,
    data: users,
  });
});

// @desc to get a single user
// @ route GET 'api/v1/users/id'

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(
        `No User with the id of ${req.params.id},404`
      )
    );
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
});

//  @desc create a user

// @route POST 'api/v1/users'

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

 return res.status(201).json({
    success: true,
    data: user,
  });
});

//  @desc update user

// @route PUT 'api/v1//users/:id

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });


  if (!user) {
    return next(
      new ErrorResponse(
        `No User with the id of ${req.params.id},404`
      )
    );
  }
  return res.status(200).json({
    success: true,
    data: user
  })
});



//  @delete user

// @route DELETE 'api/v1/users/:id

// @access Private/admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    data: {},
  });
});
