const PC = require("../Models/Laptops");


// Consulter la liste de tous les PCs
exports.getAllPCs = async (req, res) => {
  try {
    const pcs = await PC.find();
    if (pcs.length < 1) {
      res.status(404).json({ msg: "Aucun PC trouvé" });
    } else {
      res.status(200).json(pcs);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des PCs :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des PCs" });
  }
};



// Modifier un PC
exports.updatePC = async (req, res) => {
  const pcId = req.params.id;
  try {
    let pc = await PC.findById(pcId);
    if (!pc) {
      return res.status(404).json({ message: "PC non trouvé" });
    }

    pc = await PC.findByIdAndUpdate(pcId, req.body, { new: true });
    res.status(200).json({ message: "PC mis à jour avec succès", pc });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du PC :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du PC" });
  }
};

// Supprimer un PC
exports.deletePC = async (req, res) => {
  const pcId = req.params.id;
  try {
    const pc = await PC.findById(pcId);
    if (!pc) {
      return res.status(404).json({ message: "PC non trouvé" });
    }

    await PC.findByIdAndDelete(pcId);
    res.status(200).json({ message: "PC supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du PC :", error);
    res.status(500).json({ message: "Erreur lors de la suppression du PC" });
  }
};
