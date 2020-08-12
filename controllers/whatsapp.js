const axios = require("axios");

async function send(request, response) {
    const { cliente_id } = request.params;
    const { message } = request.body;
    console.log(message, cliente_id);
    await axios.post(`http://31.220.61.128:7000/chat/sendmessage/${cliente_id}`, {
        message
    });
    return response.send({ status: 'sucess'});
}

async function destroy(request, response) {
    await axios.get('http://31.220.61.128:7000/auth/destroy');
    return response.send({ status: 'sucess' })
}

async function init(request, response) {
    await axios.get('http://31.220.61.128:7000/auth/init');
    return response.send({ status: 'sucess' })
}

module.exports = { send, destroy, init };