let {users} = require('../public/data/users')
let {messages} = require('../public/data/messages')

// Users Views
const usersList = async (req,res) => {
    let message = {'message': ''}
    if (messages.length) {
        message = messages.shift();
        console.log(message);
    } 
    return res.render('../src/views/users/list', {users, message});
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

// Users APIs
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

        users.push({'id': nextId, 'name':name.toLowerCase()});
        messages.push({'message':`User ${name.toLowerCase()} created`});
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
    if (id && name) {
        console.log(name);
        let updatedUser = '';
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                updatedUser = users[i].name;
                users[i].name = name.toLowerCase();
                break
            }
        }
        messages.push({'message':`User ${updatedUser} changed to ${name.toLowerCase()}`});
        return res.status(201).json({'status': 201, 'oldName': updatedUser, 'newName': name,  'msg':'User edited correctly'})
    } else {
        return res.status(404).json({'msg':'Data not received.'})
    }
};

const destroyUser = async (req,res) => {
    const id = req.params.id;
    const deletedUser = users.find(user => user.id == id)
    users = users.filter(user => user.id != id);
    messages.push({'message':`User ${deletedUser.name} deleted`});
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