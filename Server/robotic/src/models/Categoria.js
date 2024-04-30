import mongoose from "mongoose";

const esquema = new mongoose.Schema({
    tipoProblema : {type: String, required: true}
})

export default mongoose.model('Categoria', esquema, 'categorias')