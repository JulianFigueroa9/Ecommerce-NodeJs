const { response } = require("express");
const passport = require('passport')

const homepage = async (req, res = response) => {
  try {
    res.status(200).write(`<h1>Hola ${req.session.passport.user.username}, esta es tu visita numero ${req.session.visits}</h1>`)
    res.render('index', {
      username: req.session.passport.user.username
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getSignUp = async (req, res = response) => {
  res.render('signUp')
}

const postSignUp = (req, res = response) => {
  res.redirect('/')
}

const authSignUp = passport.authenticate('signup', {failureRedirect: '/api/session/signUpError' }) 


const signUpError = async (req, res = response) => {
  res.render('signUpError')
}

const loginError = async (req, res = response) => {
  res.render('loginError')
}

const getLogin = async (req, res = response) => {
  if (req.isAuthenticated()){
    const { user } = req.user
    console.log('usuario logeado')
    res.render('index', user)
  } else {
    console.log('usuario no logeado')
    res.render('login')
  }
}

const postLogin = (req, res = response) => {
  const { username, password } = req.body
  res.render('index') 
}

const authLogin = passport.authenticate('login', {
  successRedirect: '/', 
  failureRedirect: '/api/session/loginError'
})

const logout = async (req, res = response) => {
    try {
      req.logout()
      setTimeout(()=> {
        res.render('index')
      }, 2000)
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

module.exports = {
    homepage,
    getSignUp,
    postSignUp,
    authSignUp,
    signUpError,
    getLogin,
    loginError,
    postLogin,
    authLogin,
    logout
}
