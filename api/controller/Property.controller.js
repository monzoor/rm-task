const PropertyModel = require('../model/Property.model');
const { ErrorHandler } = require('../utils/errorHandle')

const getAllproperties = async (req, res) => {
    const allpropertiesData = await PropertyModel.find();
    return allpropertiesData;
}
exports.allProperties = (req, res, next) => {
    try {
        if (Object.keys(test()).length === 0) {
            throw new ErrorHandler(404, 'User with the specified email does not exists');
            next();
        }
        res.json(getAllproperties());
    } catch (e) {
        console.error(e);
        next(e);
    }
}
// app.use('/api/properties', async (req, res) => {
//   const properties = await Property.find();
//   res.json(properties);
// });