import mongoose from "mongoose";

const esquema = new mongoose.Schema({
    nome : {type: String, required: true, index: { unique: true }},
    localSala : {type: String, required: true}
})

export default mongoose.model('Sala', esquema, 'salas')