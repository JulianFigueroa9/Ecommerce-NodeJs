const express = require("express");
const { Router } = express
const cookiesRouter = Router()

const { saveCookies, getCookies, deleteCookies } = require('../src/controllers/cookies.controller.js')

cookiesRouter.get("/", getCookies);

cookiesRouter.get("/save", saveCookies);

cookiesRouter.delete("/:cookieName", deleteCookies);

module.exports = cookiesRouter;