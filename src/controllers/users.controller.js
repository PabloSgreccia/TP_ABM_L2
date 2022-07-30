let usuario = [
    {
        'id': 2,
        'nombre':'pepe'
    },
    {
        'id': 1,
        'nombre':'juan'
    },
    {
        'id': 0,
        'nombre':'jony'
    }
]

// const index = async (req,res) => {
//     return res.render('../src/views/index');
// };

const usersList = async (req,res) => {
    return res.render('../src/views/users/list', {usuario});
};

const editUser = async (req,res) => {
    const id = req.params.id
    const targetUser = usuario.find(element => element.id == id)
    console.log(targetUser);
    return res.render('../src/views/users/edit', {targetUser});
};

const showUser = async (req,res) => {
    const id = req.params.id;
    const targetUser = usuario.find(element => element.id == id)
    console.log(targetUser);
    return res.render('../src/views/users/show', {targetUser});
};

const createUser = async (req,res) => {
    return res.render('../src/views/users/create');
};

// APIs
const storeUser = async (req,res) => {
    console.log(req.body);
    const {nombre, id} = req.body;
    if (nombre) {

        // Get max id
        const ids = usuario.map(element => {return element.id})
        const maxId = Math.max(...ids)
        const nextId = maxId + 1
        console.log(ids);
        console.log(nextId);

        usuario.unshift({'id': nextId, 'nombre':nombre});
        return res.status(200).json({
            'status': 200,
            'id': nextId, 
            nombre, 
            'msg':'Usuario creado correctamente'
        })
    } else {
        return res.status(404).json({'msg':'No se recibieron los datos'})
    }
};

const updateUser = async (req,res) => {
    const {nombre} = req.body;
    const id = req.params.id;
    if (id) {
        let index = null;
        for (let i = 0; i < usuario.length; i++) {
            if (usuario[i].id == id) {
                usuario[i].nombre = nombre;
                index = i
                break
            }
        }
        const actualizado = usuario[index];
        return res.status(201).json({'status': 201, actualizado, 'msg':'Usuario editado correctamente'})
    } else {
        return res.status(404).json({'msg':'No se recibieron los datos'})
    }
};

const destroyUser = async (req,res) => {
    const id = req.params.id;
    const eliminado = usuario.find(elemento => elemento.id == id)
    usuario = usuario.filter(elemento => elemento.id != id);
    // const eliminado = usuario.splice(id, 1);
    console.log(eliminado);
    return res.status(200).json({'status': 200, eliminado, 'msg':'Usuario eliminado correctamente'})
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