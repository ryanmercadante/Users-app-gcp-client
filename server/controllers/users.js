const User = require('../models/User')

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
}

// @desc      Get single users
// @route     GET /api/v1/users/:id
// @access    Public
exports.getUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Could not find user with that Id'
      })
    }
    return res.status(200).json({
      success: true,
      data: user
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
}

// @desc      Add user
// @route     POST /api/v1/users
// @access    Public
exports.addUser = async (req, res, next) => {
  const { body } = req
  try {
    const user = await User.create(body)
    return res.status(201).json({
      success: true,
      data: user
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message)
      return res.status(400).json({
        success: false,
        error: messages
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      })
    }
  }
}

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Public
exports.updateUser = async (req, res, next) => {
  const { params: { id }, body } = req
  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true })
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Could not find user with that Id'
      })
    }
    return res.status(200).json({
      success: true,
      data: user
    })
  } catch (err) {
    console.log('ERRRR', err)
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message)
      return res.status(400).json({
        success: false,
        error: messages
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      })
    }
  }
}

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Public
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Could not find user with that Id' 
      })
    }
    await user.remove()
    return res.status(200).json({
      success: true,
      data: {}
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
}