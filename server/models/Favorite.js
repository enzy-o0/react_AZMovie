const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    movieId: {
        type: String
    },

    movieTitle: {
        type: String
    },

    moviePost: {
        type: String
    },
    
    movieTime: {
        type: Number,
        default: 0
    }

}, {timestamps: true})

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }