const mongoose = require('mongoose')
const Schema = mongoose.Schema

const missionSchema = new Schema ({
        target: String,
        description: String,
        image: String,
        status: String,
        location: String,
        payout: Number,
        informants: {
            type:[String],
        default: undefined
        },
        weapons: {
            type:[String],
        default: undefined
        },
        stealth_requirement: Boolean,
        completed: Boolean
})

const Mission = mongoose.model('Mision', missionSchema)
module.exports = Mission