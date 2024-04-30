import mongoose from "mongoose";

const esquema = new mongoose.Schema({
    nomeSala : {type: String, required: true},
    analista : {type: String, required: true},
    solicitante : {type: String, required: false},
    descrição : {type: String, required: true},
    data : {type: Date, required: true},
    status : {type: String, required: true},
    tipoProblema : {type: String, required: true},
})

export default mongoose.model('Ticket', esquema, 'tickets')