let {users} = require('../public/data/users')

const usersList = async (req,res) => {
    return res.render('../src/views/users/list', {users});
};

const editUser = async (req,res) => {
    const id = req.params.id
    const targetUser = users.find(user => user.id == id)
    return res.render('../src/views/users/edit', {targetUser});
};

const showUser = async (req,res) => {
    const id = req.params.id;
    const targetUser = users.find(user => user.id == id)
    return res.render('../src/views/users/show', {targetUser});
};

const createUser = async (req,res) => {
    return res.render('../src/views/users/create');
};

// APIs
const storeUser = async (req,res) => {
    const {name} = req.body;
    if (name) {

        // Get max id
        let nextId = 0;
        if (users.length > 0) {
            const ids = users.map(user => {return user.id})
            const maxId = Math.max(...ids)
            nextId = maxId + 1
        }

        users.push({'id': nextId, 'name':name});
        return res.status(200).json({
            'status': 200,
            'id': nextId, 
            'name': name, 
            'msg':'User added correctly'
        })
    } else {
        return res.status(404).json({'msg':'Data not received.'})
    }
};

const updateUser = async (req,res) => {
    const {name} = req.body;
    const id = req.params.id;
    if (id) {
        let updatedUser = '';
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                updatedUser = users[i].name;
                users[i].name = name;
                break
            }
        }
        return res.status(201).json({'status': 201, 'oldName': updatedUser, 'newName': name,  'msg':'users editado correctamente'})
    } else {
        return res.status(404).json({'msg':'Data not received.'})
    }
};

const destroyUser = async (req,res) => {
    const id = req.params.id;
    const deletedUser = users.find(user => user.id == id)
    users = users.filter(user => user.id != id);
    return res.status(200).json({'status': 200, deletedUser, 'msg':'User deleted correctly'})
};

module.exports = {
    createUser,
    editUser,
    storeUser,
    destroyUser,
    updateUser,
    showUser,
    usersList
};