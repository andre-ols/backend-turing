const axios = require("axios");

async function whatsapp(request, response) {
    const { cliente_id } = request.params;
    const { message } = request.body;
    console.log(message, cliente_id);
    axios.post(`http://31.220.61.128:7000/chat/sendmessage/${cliente_id}`, {
        message
    });
}

module.exports = whatsapp;