const { Customers } = require('../models/Relationship');

class CustomersController {

    // Busca todos os clientes
    async index(request, response) {
        const result = await Customers.findAll({
            order: [["createdAt", "DESC"]]
            });
        return response.json(result)
    }

    // Busca um cliente pelo id 
    async show(request, response) {
        const result = await Customers.findByPk(request.params.id);
        if(result != null) 
            return response.json(result);
        else 
            return response.json({status: 'Invalid Id'})
    }

    // Insere um cliente no BD
    async create(request, response) {
        
        try{
            await Customers.create({
                id: request.body.id,
                nome: request.body.nome,
                endereco: request.body.endereco
            });

            return response.json({status: 'sucess'});
        }
        catch(e){
            return response.json({ status: 'error' })
        }
    }

    async update(request, response) {
        await Customers.update({ nome: request.body.nome, endereco: request.body.endereco }, {
        where: {
            id: request.body.id
        }
        });

        return response.json({status: 'sucess'})
        
        
    }
}

module.exports = CustomersController