const Newsletter = require("../Models/Newsletter");
const { validationResult } = require("express-validator");
const { sendMailNewsletter } = require("../Utils/sendMailNewsletterUser");
const { sendBulkMail } = require("../Utils/sendNotifMail");
const message = require("../Models/message");

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

exports.sendAdminNotification = async (req, res) => {
  const { subject, body } = req.body;

  try {
    // Récupérer tous les e-mails des utilisateurs inscrits
    const subscribers = await Newsletter.find().select('email -_id');
    const emails = subscribers.map(subscriber => subscriber.email);

    // Envoyer des e-mails en masse
    await sendBulkMail(emails, subject, body);

    res.status(200).json({ message: "Notifications envoyées avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi des notifications :", error);
    res.status(500).json({ message: "Erreur lors de l'envoi des notifications" });
  }
};
exports.getAllEmailNews = async (req, res) => {
  try { 
    const mailNews = await Newsletter.find();
    
    res.status(200).json(mailNews);
    
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
exports.getAllMessageNews = async (req, res) => {
  try { 
    const messageNews = await message.find();
    
    res.status(200).json(messageNews);
    
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};