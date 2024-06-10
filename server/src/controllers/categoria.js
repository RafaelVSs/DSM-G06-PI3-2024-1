import Categoria from "../models/Categoria.js";

const controller = {};

controller.create = async function(req, res) {
    try {
        await Categoria.create(req.body);

        res.status(201).send("Categoria criada com sucesso!").end();
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
            res.status(404).send("Nenhuma categoria encontrada!").end();
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
            res.status(404).send("Categoria não encontrada!").end();
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
            res.status(200).send("Categoria atualizada com sucesso!").end();
        } else {
            res.status(404).send("Categoria não encontrada!").end();
        }
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};

controller.delete = async function(req, res) {
    try {
        const result = await Categoria.findByIdAndDelete(req.params.id)
        if (result) {
            res.status(200).send("Categoria excluída com sucesso!").end();
        } else {
            res.status(404).send("Categoria não encontrada!").end();
        }
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};

export default controller;