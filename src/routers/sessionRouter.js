const express = require("express");
const { Router } = express
const sessionRouter = Router()

const authMiddleware = require('../middlewares/auth/auth.middleware.js');
const counterMiddleware = require('../middlewares/count/count.middleware.js')
const { homepage, getLogin, getSignUp, postSignUp, loginError, signUpError, authLogin, authSignUp, postLogin, logout} = require('../controllers/session.controller')

sessionRouter.get("/", authMiddleware, counterMiddleware, homepage )

sessionRouter.get("/signUp", getSignUp)

sessionRouter.get("/signUpError", signUpError)

sessionRouter.post("/signUp", authSignUp, postSignUp)

sessionRouter.get("/login", getLogin)

sessionRouter.get("/loginError", loginError)

sessionRouter.post("/login", authLogin, postLogin);

sessionRouter.get("/logout", authMiddleware, logout)

module.exports = sessionRouter;
