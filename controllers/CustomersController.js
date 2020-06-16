const Customers = require('../models/Relationship').Customers;

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
        
        await Customers.create({
            id: request.body.session,
            nome: request.body.nome,
            endereco: request.body.endereco
          });

        return response.json({status: 'sucess'});
    }

    async update(request, response) {
        await Customers.update({ endereco: request.body.endereco }, {
            where: {
              id: request.body.id
            }
          });
        return response.json({status: 'sucess'})
    }
}

module.exports = CustomersController