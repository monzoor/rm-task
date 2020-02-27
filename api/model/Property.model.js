const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const propertySchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    type: String,
    creator: {
        name: String,
        avatar: String,
    },
    location: {
        country: String,
        city: String,
    },
    booking: [
        {
            startDate: Date,
            endDate: Date,
        },
    ],
    comments: [
        {
            userName: String,
            avatar: String,
            rating: Number,
            comments: String,
            location: {
                country: String,
                city: String,
            },
        },
    ],
    image: [
        {
            url: String,
        },
    ],
});

propertySchema.plugin(mongoosePaginate);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
