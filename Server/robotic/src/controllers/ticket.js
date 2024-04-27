import Ticket from "../models/Ticket.js";

const controller = {};

controller.create = async function(req, res) {
    try {
        await Ticket.create(req.body); //Cria um novo ticket

        res.status(201).end();
    } catch (error) {
        console.error(error);

        res.status(500).end();
    }
}

controller.retrieveAll = async function(req, res) {
    try {
        const query = Ticket.find().sort({data: 1}); //Mostra os tickets ordenados por data

        
    } catch (error) {
        
    }
}