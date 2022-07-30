const Router = require('express');
const router = Router();

const {index} = require('../controllers/index.controller.js');

// Routes    
router.get("/", index);

module.exports = router;