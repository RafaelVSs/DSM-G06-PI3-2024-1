import Sala from "../models/Sala.js";

const controller = {};

controller.create = async function(req, res) {
    try {
        await Sala.create(req.body); //Cria uma nova sala   

        res.status(201).end();
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
            res.status(404).end();
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
            res.status(404).end();
        }
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};

controller.retrieveLocal = async function(req, res) {
    try {
        const result = await Sala.find({localSala: req.params.local});
        if (result) {
            res.send(result);
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
        const result = await Sala.findByIdAndDelete(req.params.id)
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};


export default controller;