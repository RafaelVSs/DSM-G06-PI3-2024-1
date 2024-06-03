import Ticket from "../models/Ticket.js";

const controller = {};

controller.create = async (req, res) => {
    try {
      const ticket = req.body;

      // Converter a string de data em um objeto Date:
      ticket.data = new Date(ticket.data); // Adicione esta linha

      const ticketCriado = await Ticket.create(ticket);
      res.status(201).json(ticketCriado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

controller.retrieveAll = async function(req, res) {
    try {
        const query = Ticket.find().sort({data: 1}); //Mostra os tickets ordenados por data
        const result = await query.exec()
        if (result) {
            res.send(result); // Envia os tickets ordenados como resposta
        } else {
            res.status(404).send('Nenhum ticket encontrado'); // Envia uma mensagem se não houver tickets
        }
    } catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).end()
    }
};

controller.retrieveOneId = async function(req, res) {
    try {

        const query = Ticket.findById(req.params.id)

        if('pop_categoria' in req.query) query.populate('categoria')

        if('pop_analista' in req.query) query.populate('analista')

        const result = await query.exec()

        // Documento encontrado ~> HTTP 200: OK (implícito)
        if(result) res.send(result)
        // Documento não encontrado ~> HTTP 404: Not Found
        else res.status(404).end()         
    } 
    catch (error) {
        console.error(error);
        // HTTP 500: Internal Server Error
        res.status(500).end();
    } 
};

controller.update = async function(req, res) {
    try {
        const result = await Ticket.findById(req.params.id);
        
        if (result) {
            // Lógica para concatenar a descrição antiga com a nova
            const novaDescrição = `${result.descrição}\n${req.body.descrição}`;

            await Ticket.findByIdAndUpdate(req.params.id, { descrição: novaDescrição });
            res.status(204).end();
        } else {
            res.status(404).end();
        } 
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};


controller.delete = async function(req, res) {
    try {
        const result = await Ticket.findByIdAndDelete(req.params.id)    
        if(result) res.status(204).end()
        else res.status(404).end()
    }
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).end()
    }

};

export default controller;