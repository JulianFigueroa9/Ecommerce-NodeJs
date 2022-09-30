const express = require("express");
const { Router } = express
const sessionRouter = Router()

const authMiddleware = require('../src/middlewares/auth/auth.middleware.js');
const counterMiddleware = require('../src/middlewares/count/count.middleware.js')
const { homepage, login, logout} = require('../src/controllers/session.controller')

sessionRouter.get("/", authMiddleware, counterMiddleware, homepage );

sessionRouter.get("/login", login);

sessionRouter.get("/logout", authMiddleware, logout);

module.exports = sessionRouter;
