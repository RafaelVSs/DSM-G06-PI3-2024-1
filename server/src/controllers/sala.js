import Sala from "../models/Sala.js";

const controller = {};

controller.create = async function(req, res) {
    try {
        await Sala.create(req.body);

        res.status(201).send("Sala criada com sucesso!").end();
    } catch (error) {
        console.error(error);   

        res.status(500).end();
    }
};

controller.retrieveAll = async function(req, res) {
    try {
        const result = await Sala.find();
        if (result) {
            res.send(result);
        } else {
            res.status(404).send("Nenhuma sala encontrada!").end();
        }
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};

controller.retrieveOneId = async function(req, res) {
    try {
        const result = await Sala.findById(req.params.id);
        if (result) {
            res.send(result);
        } else {
            res.status(404).send("Sala não encontrada!").end();
        }
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};

controller.delete = async function(req, res) {
    try {
        const result = await Sala.findByIdAndDelete(req.params.id)
        if (result) {
            res.status(200).send("Sala excluída com sucesso!").end();
        } else {
            res.status(404).send("Sala não encontrada!").end();
        }
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};


export default controller;