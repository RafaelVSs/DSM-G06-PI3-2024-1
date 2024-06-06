import mongoose from "mongoose";

const esquema = new mongoose.Schema({
    nomeSala : {type: mongoose.ObjectId, ref: 'Sala', required: true},
    analista : {type: mongoose.ObjectId, ref: 'Analista', required: true},
    solicitante : {type: String, required: false},
    descrição : {type: String, required: true},
    data : {type: Date, required: true},
    dataAtualizacao: {type: String},
    status : {type: String, required: true},
    tipoProblema : {type: mongoose.ObjectId, ref: 'Categoria', required: true},
})

export default mongoose.model('Ticket', esquema, 'tickets')