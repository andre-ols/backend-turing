const { Orders, Customers, Details } = require('../models/Relationship');
const { Op } = require("sequelize");

class OrdersController {
    // Busca todos os pedidos
    async index(request, response) {
        const result = await Orders.findAll({
            order: [["id", "DESC"]],
            where: {
            status: {
                [Op.or]: ["FILA", "PREPARO"]
            }
            }
        })
        return response.json(result);
    }

    async status(request, response) {
        const result = await Customers.findByPk(request.params.id, {
            attributes: [],
            include: [
            {
                attributes: ["status"],
                where: {
                    status: {
                        [Op.or]: ["FILA", "PREPARO"]
                    }
                },
                model: Orders,
                required: true
            }
            ]
        });

        if (result === null) 
            return response.json({ error: 'Não existe pedido aberto' });
        else 
            return response.json(result)
    }
    // Atualiza o status do pedido
    async updateStatus(request, response) {
        const result = await Orders.update(
            { status: request.params.status },
            { where: { id: request.params.id } }
            )
        request.io.emit('changeStatus');
        return response.json(result);
    }

    // Busca os pedidos por data de criação
    async chart(request, response) {
        let array = [];
        const jan = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2019-12-31 23:59:59",
                [Op.lt]: "2020-02-01 00:00:00"
            }
            }
        })
        array.push({mes: 'jan', valor: jan});
        const fev = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2020-01-31 23:59:59",
                [Op.lt]: "2020-03-01 00:00:00"
            }
            }
        })
        array.push({mes: 'fev', valor: fev});
        const mar = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2020-02-29 23:59:59",
                [Op.lt]: "2020-04-01 00:00:00"
            }
            }
        })
        array.push({mes: 'mar', valor: mar});
        const abr = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2020-03-31 23:59:59",
                [Op.lt]: "2020-05-01 00:00:00"
            }
            }
        })
        array.push({mes: 'abr', valor: abr});
        const mai = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2020-04-30 23:59:59",
                [Op.lt]: "2020-06-01 00:00:00"
            }
            }
        })
        array.push({mes: 'mai', valor: mai});
        const jun = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2020-05-31 23:59:59",
                [Op.lt]: "2020-07-01 00:00:00"
            }
            }
        })
        array.push({mes: 'jun', valor: jun});
        const jul = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2020-06-30 23:59:59",
                [Op.lt]: "2020-08-01 00:00:00"
            }
            }
        })
        array.push({mes: 'jul', valor: jul});
        const ago = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2020-07-31 23:59:59",
                [Op.lt]: "2020-09-01 00:00:00"
            }
            }
        })
        array.push({mes: 'ago', valor: ago});
        const set = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2020-08-31 23:59:59",
                [Op.lt]: "2020-10-01 00:00:00"
            }
            }
        })
        array.push({mes: 'set', valor: set});
        const out = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2020-09-30 23:59:59",
                [Op.lt]: "2020-11-01 00:00:00"
            }
            }
        })
        array.push({mes: 'out', valor: out});
        const nov = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2020-10-31 23:59:59",
                [Op.lt]: "2020-12-01 00:00:00"
            }
            }
        })
        array.push({mes: 'nov', valor: nov});
        const dez = await Orders.sum('total',{
            where: {
            createdAt: {
                [Op.gt]: "2020-11-30 23:59:59",
                [Op.lt]: "2021-01-01 00:00:00"
            }
            }
        })
        array.push({mes: 'dez', valor: dez});

        return response.json(array);
    }

    // Realiza o somatorio do preço de todos os pedidos
    async summation(request, response) {
        //Convertendo data para o nosso fuso
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
        
        const result = await Orders.sum('total', { 
            where: {
                status: "FINALIZADO",
                 createdAt: {
                    [Op.gt]: date,
                    [Op.lt]: lastDate
            }
            }
        });
        return response.json({total: result})
    }

    async PaymentCard(request, response) {
        //Convertendo data para o nosso fuso
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
        
        const result = await Orders.sum('total', { 
            where: {
                status: "FINALIZADO",
                pagamento: "Cartão",
                 createdAt: {
                    [Op.gt]: date,
                    [Op.lt]: lastDate
            }
            }
        });
        return response.json({total: result})
    }

    async PaymentMoney(request, response) {
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
        
        const result = await Orders.sum('total', { 
            where: {
                status: "FINALIZADO",
                pagamento: "Dinheiro",
                 createdAt: {
                    [Op.gt]: date,
                    [Op.lt]: lastDate
            }
            }
        });
        return response.json({total: result})
    }

    // Insere um pedido no banco
    async create(request, response) {
        const { cliente_id, observacao, total, troco, status, pagamento, pedidos } = request.body;

        // Salvando o pedido no BD 
        const orders = await Orders.create({
            cliente_id,
            troco,
            observacao,
            total,
            status,
            pagamento
          });
        
        pedidos.map( pedidos => {
            pedidos.pedido_id = orders.dataValues.id;
        })
          
        //Salvando o array de detalhes do pedido no BD
        await Details.bulkCreate(pedidos);

        request.io.emit('newOrder');

        return response.json(orders.dataValues);

    }

}

module.exports = OrdersController;