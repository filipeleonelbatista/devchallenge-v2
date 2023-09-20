const express = require('express');
const routes = express.Router();
const db = require('./database/connection');
const LetterController = require('./controller/LetterController')

routes.get("/letters", LetterController.show );
routes.post("/letters", LetterController.create );


module.exports = routes;