const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post('/favoriteNumber', (req, res) => {
    Favorite
    .find({ "movieId": req.body.movieId})
    .exec((err, info) => {
        if(err) return res.status(400).send(err)

        return res.status(200).json( { success: true, favoriteNumber: info.length})
    })
})

router.post('/favorited', (req, res) => {
    Favorite
    .find({ "movieId" : req.body.movieId, "userFrom" :  req.body.userFrom})
    .exec((err, info) => {
        if(err) return res.status(400).send(err)

        let result = false;
        if (info.length !== 0) {
            result = true
        }

        return res.status(200).json( { success: true, favorited: result})
    })
})

router.post('/favorited/list', (req, res) => {
    Favorite
    .find({ "userFrom" :  req.body.userFrom})
    .exec((err, favorite) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json( { success: true, favorite})
    })
})

router.post('/favorited/removeFavorite', (req, res) => {
    Favorite
    .findOneAndRemove({ movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json( { success: true, doc })
    })

})

router.post('/favorited/addFavorite', (req, res) => {
    const favorite = new Favorite(req.body)
    favorite.save((err, doc) => {
        
        if (err) {
            return res.status(400).send(err)
        }
        
        return res.status(200).json({success: true, doc})
    })

})


module.exports = router;
