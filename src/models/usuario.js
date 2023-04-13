const mongoose = require('mongoose');
const validator = require('validator');

const esquema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: 'É obrigatório',
        },
        email:{
            type: String,
            unique: true,
            required: 'É obrigatório',
            lowercase: true,
            index: true,
            validate: {
                validator: (valorDigitado) => {return validator.isEmail(valorDigitado)},
                message: 'inválido!'
            }
        },
        senha: {
            type: String,
            required: 'É obrigatório',
            select: false,
        },
    },
    {
        timestamps: true
    }

    );

    const EsquemaUsuario = mongoose.models.Usuario || mongoose.model('Usuario', esquema);
    module.exports = EsquemaUsuario;