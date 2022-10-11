
const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/api/session/login')
  }
}

module.exports = authMiddleware