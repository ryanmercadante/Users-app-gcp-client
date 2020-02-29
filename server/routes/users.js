const express = require('express')
const router = express.Router()
const { getUsers, addUser, deleteUser } = require('../controllers/users.js')

router
  .route('/')
  .get(getUsers)
  .post(addUser)

router
  .route('/:id')
  .delete(deleteUser)

module.exports = router