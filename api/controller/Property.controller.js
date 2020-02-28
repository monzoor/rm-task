const PropertyModel = require('../model/Property.model');
const { ErrorHandler } = require('../utils/errorHandle');
const multer = require('multer');

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

exports.search = async (req, res, next) => {
    try {
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
        };
        // console.log('=====', req.query);

        allpropertiesData = await PropertyModel.paginate(
            {
                $or: [
                    {
                        'location.country': new RegExp(
                            req.query.location,
                            'gi'
                        ),
                    },
                    { 'location.city': new RegExp(req.query.location, 'gi') },
                ],
            },
            options
        );
        // console.log('----', allpropertiesData);

        const dataPrep = {
            data: allpropertiesData.docs,
            paginationInfo: {
                totalPages: allpropertiesData.totalPages,
                limit: allpropertiesData.limit,
                prevPage: allpropertiesData.prevPage,
                nextPage: allpropertiesData.nextPage,
                currentPage: allpropertiesData.page,
            },
        };
        if (allpropertiesData.docs.length === 0) {
            throw new ErrorHandler(404, 'No Data Found');
            next();
        }
        res.json(dataPrep);
    } catch (e) {
        next(e);
    }
};
exports.allProperties = async (req, res, next) => {
    try {
        let options = {
            page: 1,
            limit: 10,
        };
        let allpropertiesData = {};
        if (req.params.itemType === 'priority') {
            // allpropertiesData = await PropertyModel.paginate(
            //     { comments: { $gt: [] } },
            //     options
            // );
            allpropertiesData = await PropertyModel.paginate({}, options);
        } else if (req.params.id) {
            options = {};
            allpropertiesData = await PropertyModel.paginate({
                _id: req.params.id,
            });
        } else {
            allpropertiesData = await PropertyModel.paginate({}, options);
        }

        if (allpropertiesData.docs.length === 0) {
            throw new ErrorHandler(404, 'No Data Found');
            next();
        }

        let dataPrep = {
            data: allpropertiesData.docs,
        };
        if (Object.keys(options).length) {
            dataPrep = {
                ...dataPrep,
                paginationInfo: {
                    totalPages: allpropertiesData.totalPages,
                },
            };
        }
        res.json(dataPrep);
    } catch (e) {
        console.error('========', e);
        next(e);
    }
};

exports.booking = async (req, res, next) => {
    const { id, booking } = req.body;
    try {
        await PropertyModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $push: {
                    booking: {
                        startDate: booking.startDate,
                        endDate: booking.endDate,
                    },
                },
            }
        )
            .then(() => {
                res.status(200).json({
                    status: 'sucess',
                    statusCode: 200,
                    message: 'Sucessfuly booked',
                });
            })
            .catch(() => {
                if (Object.keys(allpropertiesData).length === 0) {
                    throw new ErrorHandler(404, 'No Data Found');
                    next();
                }
            });
    } catch {
        next(e);
    }
};
exports.comments = async (req, res, next) => {
    console.log(req.params, req.body);

    const { id } = req.params;
    const { location, userName, avatar, rating, comments } = req.body;
    // return;
    try {
        await PropertyModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $push: {
                    comments: {
                        location,
                        userName,
                        avatar,
                        rating,
                        comments,
                    },
                },
            }
        )
            .then(() => {
                res.status(200).json({
                    status: 'sucess',
                    statusCode: 200,
                    message: 'Sucessfuly booked',
                });
            })
            .catch(() => {
                if (Object.keys(allpropertiesData).length === 0) {
                    throw new ErrorHandler(404, 'No Data Found');
                    next();
                }
            });
    } catch {
        next(e);
    }
};
exports.createProperties = async (req, res, next) => {
    console.log('-asdasd--', req.body.images);
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
        comments: req.body.comments,
        creator: {
            name: 'Monzoor',
            avatar:
                'https://cdn.iconscout.com/icon/premium/png-256-thumb/female-avatar-12-774634.png',
        },
        image: req.body.images,
        // comments: [
        //     {
        //         userName: 'Wasiq',
        //         avatar:
        //             'https://cdn.iconscout.com/icon/premium/png-256-thumb/female-avatar-12-774634.png',
        //         rating: 5,
        //         comments: 'We hated your smelly shitty house',
        //         location: {
        //             country: 'Bangladesh',
        //             city: 'Dhaka',
        //         },
        //     },
        // ],
    });
    try {
        await newProperty
            .save()
            .then(() => {
                res.status(200).json({
                    status: 'sucess',
                    statusCode: 200,
                    message: 'Sucessfuly property created',
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

exports.imageUpload = (req, res, next) => {
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'public/uploads/');
        },
        filename(req, file, cb) {
            cb(null, `${new Date().getTime()}_.jpg`);
        },
    });
    const fileFilter = (req, file, cb) => {
        // reject a file
        if (file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error('type unmatched'), false);
        }
    };
    const upload = multer({
        storage,
        limits: {
            fileSize: 1024 * 1024 * 10, // 10MB
        },
        fileFilter,
        // }).single('productImage');
        // }).array('productImage', 1000);
    }).any();

    // upload.array('productImage', 2)
    upload(req, res, err => {
        if (err) {
            const status = 415;
            const message = `Error to upload file ${err}`;
            res.status(status).json({ status, message });
        } else {
            const status = 200;
            const uploadedData = req.files.map(data => ({
                // uid: data.filename.replace('.jpg', ''),
                // name: data.originalname,
                url: `/img/${data.filename}`,
            }));
            console.log('---', uploadedData);
            res.status(status).json(uploadedData);
        }
    });
};
