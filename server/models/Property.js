const bcrypt = require("bcryptjs");
const { model, Schema } = require("mongoose");
const defaultPropertyTypes = ["Hostel", "PG", "Flat"];
const defaultGenders = ["Boys", "Girls", "Boys&Girls"];

const propertySchema = new mongoose.Schema({
    type: {
      type: String,
      enum: defaultPropertyTypes
    },
    name: String,
    location: {
      address: String,
      city: String
    },
    photos: [String],
    rent: {
      single: Number,
      double: Number,
      triple: Number
    },
    gender: {
      type: String,
      enum: defaultGenders
    },
    owner: {
      name: String,
      contact: String
    },
    facilities: [String], 
    description: String,
    ratings: {
      overall: {
        type: Number,
        default: 0 
      },
      cleanliness: {
        type: Number,
        default: 0
      },
      safety: {
        type: Number,
        default: 0
      },
    }
  });

module.exports = model("property", propertySchema);