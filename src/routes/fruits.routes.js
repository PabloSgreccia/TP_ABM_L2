const Router = require('express');
const router = Router();

const {fruitsList, createFruit, editFruit, storeFruit, updateFruit, destroyFruit, showFruit} 
    = require('../controllers/fruits.controller.js');

// Routes
router.get("/list", fruitsList);
router.get("/create", createFruit);
router.get("/edit/:id", editFruit);
router.get("/show/:id", showFruit);

// APIs
router.post("/store", storeFruit);
router.patch("/:id", updateFruit);
router.delete("/:id", destroyFruit);

module.exports = router;