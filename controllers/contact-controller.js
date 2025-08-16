const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    if (!username || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Contact.create({ username, email, message });

    return res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact Error:", error);
    return res.status(500).json({ message: "Message not delivered" });
  }
};

module.exports = contactForm;
