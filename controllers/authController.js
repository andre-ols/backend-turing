const jwt = require("jsonwebtoken");
const { Restaurants } = require('../models/Relationship');
const authConfig =  require("../config/auth.json");

const authenticate = async (request, response) => {
    const { email, senha } = request.body;
    const user = await Restaurants.findOne({ where: { email } });
    
    if(!user || senha != user.dataValues.senha) return response.status(401).send({ error: 'Incorrect email or password' });

    user.dataValues.senha = undefined;
    console.log(user.dataValues)

    const token = jwt.sign({ id: user.dataValues.id }, authConfig.secret, {
        expiresIn: 43200
    });

    return response.send({ 
        user,
        token
    });

}

const register = async (request, response) => {
    const { nome, email, senha, endereco } = request.body;

    try {
        
        if( await Restaurants.findOne({ where: { email } }) ) return response.status(400).json({ error: 'User already exists' });

        const user = await Restaurants.create({
            nome, email, senha, endereco
        })

        user.dataValues.senha = undefined;

        return response.send({
            user
        })
    }
    catch(e){
        return response.status(400).send({ error: 'Registration failed' });
    }
}

module.exports = {
    authenticate,
    register
};