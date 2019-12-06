const CarOrder = require('../models/carorder');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error:'Image could not be uploaded'                
            })
        }

        const {name, surname, startingLocation, finalLocation, from, to} = fields

        if(!name || !surname || !startingLocation || !finalLocation || !from || !to){
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let carOrder = new CarOrder(fields)

        carOrder.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
}

exports.listOrder = (req, res) =>{
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 10

    CarOrder.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, carorders) => {
            if(err){
                return res.status(400).json({
                    error:'Cars not found'
                })
            }
            res.json(carorders);
        })
}