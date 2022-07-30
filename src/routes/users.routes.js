const Router = require('express');
const router = Router();

const {usersList, createUser, editUser, storeUser, updateUser, destroyUser, showUser} 
    = require('../controllers/users.controller.js');

// Routes    
router.get("/list", usersList);
router.get("/create", createUser);
router.get("/edit/:id", editUser);
router.get("/show/:id", showUser);

// APIs
router.post("/store", storeUser);
router.patch("/:id", updateUser);
router.delete("/:id", destroyUser);

module.exports = router;