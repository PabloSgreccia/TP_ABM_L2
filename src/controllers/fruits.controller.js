let {fruits} = require('../public/data/fruits')
let {messages} = require('../public/data/messages')

// Fruits Views
const fruitsList = async (req,res) => {
    let message = {'message': ''}
    if (messages.length) {
        message = messages.shift();
    } 
    return res.render('../src/views/fruits/list', {fruits, message});
};

const editFruit = async (req,res) => {
    const id = req.params.id
    const targetFruit = fruits.find(fruit => fruit.id == id)
    return res.render('../src/views/fruits/edit', {targetFruit});
};

const showFruit = async (req,res) => {
    const id = req.params.id;
    const targetFruit = fruits.find(fruit => fruit.id == id)
    return res.render('../src/views/fruits/show', {targetFruit});
};

const createFruit = async (req,res) => {
    return res.render('../src/views/fruits/create');
};

// Fruits APIs
const storeFruit = async (req,res) => {
    const {type} = req.body;
    if (type) {

        // Get max id
        let nextId = 0;
        if (fruits.length > 0) {
            const ids = fruits.map(fruit => {return fruit.id})
            const maxId = Math.max(...ids)
            nextId = maxId + 1
        }

        fruits.push({'id': nextId, 'type':type.toLowerCase()});
        messages.push({'message':`Fruit "${type.toLowerCase()}" added`});
        return res.status(200).json({
            'status': 200,
            'id': nextId, 
            'type': type, 
            'msg':'Fruit added correctly'
        })
    } else {
        return res.status(404).json({'msg':'Data not received.'})
    }
};

const updateFruit = async (req,res) => {
    const {type} = req.body;
    const id = req.params.id;
    if (id && (type != '')) {
        let updatedFruit = '';
        for (let i = 0; i < fruits.length; i++) {
            if (fruits[i].id == id) {
                updatedFruit = fruits[i].type;
                fruits[i].type = type.toLowerCase();
                break
            }
        }
        messages.push({'message':`Fruit "${updatedFruit}" changed to "${type.toLowerCase()}"`});
        return res.status(201).json({'status': 201, 'oldType': updatedFruit, 'newType': type, 'msg':'Fruit updated correctly'})
    } else {
        return res.status(404).json({'msg':'Data not received.'})
    }
};

const destroyFruit = async (req,res) => {
    const id = req.params.id;
    const deletedFruit = fruits.find(fruit => fruit.id == id)
    fruits = fruits.filter(fruit => fruit.id != id);
    messages.push({'message':`Fruit "${deletedFruit.type}" deleted`});
    return res.status(200).json({'status': 200, deletedFruit, 'msg':'Fruit deleted correctly'})
};

module.exports = {
    createFruit,
    editFruit,
    storeFruit,
    destroyFruit,
    updateFruit,
    showFruit,
    fruitsList
};