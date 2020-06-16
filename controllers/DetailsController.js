const Relationship = require('../models/Relationship');
const Orders = Relationship.Orders;
const Customers = Relationship.Customers;
const Details = Relationship.Details

class DetailsController {
    /* 
    * Busca o pedido pelo id
    * Busca o nome e o endereço do cliente na tabela clientes
    * Busca os detalhes do pedido na tabela detalhes
    * Traz tudo em uma unica query
    */
    async show(request, response) {
        const result = await Orders.findByPk(request.params.id, {
            attributes: ["status", "total", "observacao", "pagamento"],
            include: [
            {
                attributes: ["nome", "endereco"],
                model: Customers,
                required: true
            },
            {
                attributes: ["item", "id", "quantidade"],
                model: Details,
                required: true
            }
            ]
        });

        if (result != null) 
            return response.json(result);
        else 
            return response.json({status: 'Invalid Id'})
    }
}

module.exports = DetailsController;