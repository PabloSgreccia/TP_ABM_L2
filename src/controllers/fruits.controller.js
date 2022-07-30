let fruits = [
    {
        'id': 2,
        'type':'Apple'
    },
    {
        'id': 1,
        'type':'Banana'
    },
    {
        'id': 0,
        'type':'Strawberry'
    }
]

const fruitsList = async (req,res) => {
    return res.render('../src/views/fruits/list', {fruits});
};

const editFruit = async (req,res) => {
    const id = req.params.id
    const targetFruit = fruits.find(fruit => fruit.id == id)
    console.log(targetFruit);
    return res.render('../src/views/fruits/edit', {targetFruit});
};

const showFruit = async (req,res) => {
    const id = req.params.id;
    const targetFruit = fruits.find(fruit => fruit.id == id)
    console.log(targetFruit);
    return res.render('../src/views/fruits/show', {targetFruit});
};

const createFruit = async (req,res) => {
    return res.render('../src/views/fruits/create');
};

// APIs
const storeFruit = async (req,res) => {
    console.log(req.body);
    const {type} = req.body;
    if (type) {

        // Get max id
        let nextId = 0;
        if (fruits.length > 0) {
            const ids = fruits.map(element => {return element.id})
            const maxId = Math.max(...ids)
            nextId = maxId + 1
        }

        fruits.unshift({'id': nextId, 'type':type.toUpperCase()});
        return res.status(200).json({
            'status': 200,
            'id': nextId, 
            'type': type.toUpperCase(), 
            'msg':'Fruit added correctly'
        })
    } else {
        return res.status(404).json({'msg':'Data not received.'})
    }
};

const updateFruit = async (req,res) => {
    console.log(req.body);
    const {type} = req.body;
    const id = req.params.id;
    if (id) {
        let updatedFruit = '';
        for (let i = 0; i < fruits.length; i++) {
            if (fruits[i].id == id) {
                updatedFruit = fruits[i].type;
                fruits[i].type = type;
                break
            }
        }
        return res.status(201).json({'status': 201, 'oldType': updatedFruit, 'newType': type, 'msg':'Fruit updated correctly'})
    } else {
        return res.status(404).json({'msg':'Data not received.'})
    }
};

const destroyFruit = async (req,res) => {
    const id = req.params.id;
    const deletedFruit = fruits.find(fruit => fruit.id == id)
    fruits = fruits.filter(fruit => fruit.id != id);
    // const deletedFruit = fruits.splice(id, 1);
    // console.log(deletedFruit);
    return res.status(200).json({'status': 200, deletedFruit, 'msg':'Fruit removed correctly'})
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