const Newsletter = require("../Models/Newsletter");
const { validationResult } = require("express-validator");
const { sendMailNewsletter } = require("../Utils/sedMailPasswordUser");

exports.inscritNewsletter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { email } = req.body;
  
  try {
    let existingNews = await Newsletter.findOne({ email });

    if (existingNews) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    const newNews = new Newsletter({
      email
    });

    await newNews.save();

    res.status(200).json({ message: "Inscription réussie" });
    await sendMailNewsletter(email)
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
};
