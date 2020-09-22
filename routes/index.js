const express = require('express')
const router = express.Router()
const path = require('path')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// login - landing page
router.get('/', ensureGuest, function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'))
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'), {
        name: req.user.firstName,
    })
   
})
module.exports = router