const PropertyModel = require('../model/Property.model');
const { ErrorHandler } = require('../utils/errorHandle');

exports.deleteAll = async (req, res, next) => {
    try {
        await PropertyModel.remove({});
        res.status(200).json({
            status: 'sucess',
            message: 'deleted all',
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
};
exports.allProperties = async (req, res, next) => {
    try {
        const allpropertiesData = await PropertyModel.find();
        if (Object.keys(allpropertiesData).length === 0) {
            throw new ErrorHandler(404, 'No Data Found');
            next();
        }
        res.json({
            data: allpropertiesData,
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
};

exports.createProperties = async (req, res, next) => {
    console.log('---', req.body);
    if (!req.body) {
        throw new ErrorHandler(400, 'Please fill all required field');
    }
    const newProperty = new PropertyModel({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        type: req.body.type,
        location: {
            country: req.body.country,
            city: req.body.city,
        },
        comments: [
            {
                userName: 'Wasiq',
                avatar:
                    'https://cdn.iconscout.com/icon/premium/png-256-thumb/female-avatar-12-774634.png',
                rating: 5,
                comments: 'We hated your smelly shitty house',
                location: {
                    country: 'Bangladesh',
                    city: 'Dhaka',
                },
            },
        ],
        image: [
            'https://cdn.vox-cdn.com/thumbor/CTluvlc9kScZlylzsRR4QRCE4Gg=/6x0:641x423/1200x800/filters:focal(6x0:641x423)/cdn.vox-cdn.com/uploads/chorus_image/image/48767301/Screen_Shot_2016-02-09_at_9.08.28_AM.0.0.png',
        ],
    });
    try {
        await newProperty
            .save()
            .then(() => {
                res.status(200).json({
                    status: 'sucess',
                    statusCode: 200,
                });
            })
            .catch(err => {
                throw new ErrorHandler(400, 'Property not created');
            });
    } catch (e) {
        console.error(e);
        next(e);
    }
};
