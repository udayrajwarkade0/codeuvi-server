const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    // console.log(users);

    if (!users || users.length === 0) {
      return res.status(200).json({ message: "No Users Found " });
    }

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// CONTACT USER LOGIC --------------------------------------------------------

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    if (!contacts || contacts.length === 0) {
      return res.status(200).json({ message: "No Contact Found " });
    }

    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// CONTACT DELET BY ID
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });

    return res.status(200).json({ message: "contact  Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//? SINGL USER LOGIC-------------------------------------------------------------------

const getAUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//?USER UPDATE LOGIC-------------------------------------------------------------------

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      { $set: updateUserData }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

//? USER DELETE LOGIC-------------------------------------------------------------------
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });

    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all services
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    if (!services || services.length === 0) {
      return res.status(200).json({ message: "No Services Found" });
    }
    return res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

// Add new service
const addService = async (req, res, next) => {
  try {
    const { weblink, description, github, thumbnail } = req.body;

    if (!weblink || !description || !github || !thumbnail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newService = new Service({ weblink, description, github, thumbnail });
    await newService.save();

    return res
      .status(201)
      .json({ message: "Service Added Successfully", service: newService });
  } catch (error) {
    next(error);
  }
};

// Delete service by ID
const deleteServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Service.deleteOne({ _id: id });

    return res.status(200).json({ message: "Service Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getAUserById,
  updateUserById,
  deleteContactById,
  getAllServices,
  addService,
  deleteServiceById,
};
