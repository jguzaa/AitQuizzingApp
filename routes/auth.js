const express = require('express')
const passport = require('passport')
const path = require('path')

const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

//const publicPath = path.join(__dirname, '../public/dashboard');
// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.session.destroy()
  req.logout()
  res.redirect('/')
})

module.exports = router