const Router = require('express');
const router = Router();

const {index, likesCounter} = require('../controllers/index.controller.js');

// Routes    
router.get("/", index);

// APIs
router.patch("/counter/update", likesCounter);

module.exports = router;