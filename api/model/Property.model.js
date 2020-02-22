const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  type: String,
  location: {
    country: String,
    city: String,
  },
  comments: [
    {
      userName: String,
      avatar: String,
      rating: Number,
      comments: String,
    }
  ],
  image: [String]
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
