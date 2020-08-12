const { Orders, Customers, Details } = require('../models/Relationship');
const { Op } = require("sequelize");

class DetailsController {
    /* 
    * Busca o pedido pelo id
    * Busca o nome e o endereço do cliente na tabela clientes
    * Busca os detalhes do pedido na tabela detalhes
    * Traz tudo em uma unica query
    */
    async show(request, response) {
        console.log(request.params.id)
        var result = await Orders.findByPk(request.params.id, {
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

        if (result != null){
            result.dataValues.time = (new Date() - result.dataValues.createdAt) / 60000;
            return response.json(result);
        }
        else 
            return response.json({status: 'Invalid Id'})
    }

    async soldItems(request, response) {
        //Data incial
        const date = new Date();
        //Trazendo para o nosso fuso
        date.setHours(date.getHours() - 3);
        date.setMinutes(date.getMinutes() - date.getMinutes());
        date.setSeconds(date.getSeconds() - date.getSeconds());

        if(date.getHours() >= 0 && date.getHours() <= 12) 
            date.setDate(date.getDate() - 1);
            
        date.setHours(12);
        //Volta pro fuso padrão
        date.setHours(date.getHours() + 3);

        //Data limite
        const lastDate = new Date();
        //Trazendo para o nosso fuso
        lastDate.setHours(lastDate.getHours() - 3);
        lastDate.setMinutes(lastDate.getMinutes() - lastDate.getMinutes());
        lastDate.setSeconds(lastDate.getSeconds() - lastDate.getSeconds());

        if(lastDate.getHours() >= 12) 
            lastDate.setDate(lastDate.getDate() + 1);
            
        lastDate.setHours(12);
        //Volta pro fuso padrão
        lastDate.setHours(lastDate.getHours() + 3);

        const result = await Details.findAll({
            attributes: ["quantidade"],
            include: [
            {
                attributes: [],
                where: {
                    status: "FINALIZADO",
                    createdAt: {
                        [Op.gt]: date,
                        [Op.lt]: lastDate
                    }
                },
                model: Orders,
                required: true
            }
            ]
        })

        const number = result.reduce(function(total, item){
            return total + item.quantidade;
        }, 0);

        response.json({total: number})
    }
}

module.exports = DetailsController;