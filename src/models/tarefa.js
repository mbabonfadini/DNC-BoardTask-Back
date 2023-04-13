const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
    {
        posicao: {
            type: Number,
            required: 'É obrigatório',
        },
        titulo: {
            type: String,
            required: 'É obrigatório',
        },
        descricao: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            required: 'É obrigatório',
        },
        dataEntrega: {
            type: Date,
            default: null,
        },
        usuarioCriador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: 'É obrigatório',
        }
    },
    {
        timestamps: true
    }

);

const EsquemaTarefa = mongoose.models.Tarefa || mongoose.model('Tarefa', esquema);
module.exports = EsquemaTarefa;