const express = require("express");
const { Router } = express
const sessionRouter = Router()

const authMiddleware = require('../middlewares/auth/auth.middleware.js');
const counterMiddleware = require('../middlewares/count/count.middleware.js')
const { homepage, postLogin, logout} = require('../controllers/session.controller')

sessionRouter.get("/", authMiddleware, counterMiddleware, homepage )

sessionRouter.post("/login", postLogin);

sessionRouter.get("/logout", authMiddleware, logout)

module.exports = sessionRouter;
