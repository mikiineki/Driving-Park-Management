const Car = require('../models/car');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.carById = (req, res, next, id) => {
    Car.findById(id).exec((err, car) => {
        if(err || !car){
            return res.status(400).json({
                error: "That car does not exist"
            });
        }
        req.car = car
        next();
    });
};

exports.read = (req, res) => {
    req.car.photo = undefined
    return res.json(req.car);
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error:'Image could not be uploaded'                
            })
        }

        const {name, chassis, engine, enginePower, fuel, year, category} = fields

        if(!name || !chassis || !engine || !enginePower || !fuel || !year || !category){
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let car = new Car(fields)

        if(files.photo){
            if(files.photo.size>1000000){
                return res.status(400).json({
                    error: "Image is bigger than 1mb"
                })
            }
            car.photo.data = fs.readFileSync(files.photo.path);
            car.photo.contentType = files.photo.type;
        }

        car.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
}

exports.remove = (req, res) => {
    let car = req.car
    car.remove((err, deletedCar) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            "message": 'Car deleted.'
        })
    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error:'Image could not be uploaded'                
            })
        }

        const {name, chassis, engine, enginePower, fuel, year, category} = fields

        if(!name || !chassis || !engine || !enginePower || !fuel || !year || !category){
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let car = req.car
        car = _.extend(car, fields)

        if(files.photo){
            if(files.photo.size>1000000){
                return res.status(400).json({
                    error: "Image is bigger than 1mb"
                })
            }
            car.photo.data = fs.readFileSync(files.photo.path);
            car.photo.contentType = files.photo.type;
        }

        car.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
}

exports.list = (req, res) =>{
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 10

    Car.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, cars) => {
            if(err){
                return res.status(400).json({
                    error:'Cars not found'
                })
            }
            res.json(cars);
        })
}

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    Car.find({_id: {$ne: req.car}, category: req.car.category})
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, cars) => {
        if(err) {
            return res.status(400).json({
                error:"Cars not found"
            })
        }
        res.json(cars);
    })
}

exports.listCategories = (req, res) => {
    Car.distinct("category", {}, (err, categories) => {
        if(err) {
            return res.status(400).json({
                error:"Cars not found"
            })
        }
        res.json(categories);
    })
}

exports.photo = (req, res, next) => {
    if(req.car.photo.data){
        res.set('Content-Type', req.car.photo.contentType)
        return res.send(req.car.photo.data);
    }
    next();
}

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'date') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Car.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Cars not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.listSearch = (req, res) => {
    const query = {};
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' };
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        Car.find(query, (err, cars) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(cars);
        }).select('-photo');
    }
};
