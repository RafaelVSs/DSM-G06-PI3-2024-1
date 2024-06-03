import Categoria from "../models/Categoria.js";

const controller = {};

controller.create = async function(req, res) {
    try {
        await Categoria.create(req.body); //Cria uma nova categoria 

        res.status(201).end();
    } catch (error) {
        console.error(error);

        res.status(500).end();
    }
};

controller.retrieveAll = async function(req, res) {
    try {
        const result = await Categoria.find();
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
        const result = await Categoria.findById(req.params.id);
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
        const result = await Categoria.findById(req.params.id);
        if (result) {
            await Categoria.findByIdAndUpdate(req.params.id, req.body);
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