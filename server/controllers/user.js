const Auth = require("../models/Auth");
const Property = require('../models/Property')
const profile = async (req, res, next) => {
  try {
    const user = req.user;

    const data = await Auth.findOne({ userName: user.userName }).select(
      "name email"
    );

    return res.json(data);
  } catch (error) {
    next(error);
  }
};


const PostProperty = async (req, res, next) => {
  try { 
    const property = req.body;
    const data = await Property.create(property)
    return res.status(201).json({ property: data, message: "Property created successfully!" });
  } catch (error) {
    next(error);
  }
}

module.exports = { profile, PostProperty };
