const Router = require('express');
const router = Router();

const {index, usersList, create, edit, store, update, destroy, show} 
    = require('../controllers/index.controller.js');

// Routes    
router.get("/", index);
router.get("/users/users_list", usersList);
router.get("/users/create", create);
router.get("/users/edit/:id", edit);
router.get("/users/show/:id", show);

// APIs
router.post("/store", store);
router.patch("/:id", update);
router.delete("/:id", destroy);

module.exports = router;