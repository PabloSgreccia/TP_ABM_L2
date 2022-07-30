let {likeCounter} = require('../public/data/counter');

// Views
const index = async (req,res) => {
    return res.render('../src/views/index', {likeCounter});
};

// APIs
const likesCounter = async (req, res) => {
    let {value} = req.body;
    likeCounter = value;
    return res.status(200).json({'status': 201, likeCounter, 'msg':'Increased counter'})
}


module.exports = {
    index,
    likesCounter
};