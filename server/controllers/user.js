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

const GetPropertyByPage = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(pageSize) || 6;

    const totalCount = await Property.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const properties = await Property.find()
      .skip((pageNumber - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      properties,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const GetSingleProperty = async (req, res, next) => {
  try {
    const { propertyid } = req.query;

    const property = await Property.findById(propertyid);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    return res.status(200).json({ property });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { profile, PostProperty, GetPropertyByPage,GetSingleProperty };
