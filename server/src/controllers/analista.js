import Analista from "../models/Analista.js";

const controller = {};

controller.create = async function(req, res) {
    try {
        await Analista.create(req.body); //Cria um novo analista

        res.status(201).end();
    } catch (error) {    
        console.error(error);  

        res.status(500).end();
    }
};   

controller.retrieveOneId = async function(req, res) {
    try {
        const result = await Analista.findById(req.params.id);
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

controller.retrieveAll = async function(req, res) {
    try {
        const result = await Analista.find();
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

controller.update = async function(req, res) {
    try {
        const result = await Analista.findById(req.params.id);
        if (result) {
            await Analista.findByIdAndUpdate(req.params.id, req.body);
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
        const result = await Analista.findByIdAndDelete(req.params.id);
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