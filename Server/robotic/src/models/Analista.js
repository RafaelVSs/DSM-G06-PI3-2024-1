import mongoose from "mongoose";

const esquema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: { type: String, required: true, index: { unique: true } },
    senha: {type: String, required: true},
    localAnalista: {type: String, required: true}
})

export default mongoose.model('Analista', esquema, 'analistas')