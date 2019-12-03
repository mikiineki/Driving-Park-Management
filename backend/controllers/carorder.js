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