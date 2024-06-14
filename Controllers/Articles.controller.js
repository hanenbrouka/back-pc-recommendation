

const { getLaptopsFromCollections, updateLaptop, deleteLaptop  } = require('../config/db');
//get
exports.getAllPCs = async (req, res) => {
  try {
    const laptopsByCategory = await getLaptopsFromCollections();
    if (Object.keys(laptopsByCategory).every(category => laptopsByCategory[category].length === 0)) {
      return res.status(404).json({ msg: "Aucun PC trouvé dans les collections" });
    } else {
      return res.status(200).json(laptopsByCategory);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des PCs depuis les collections :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des PCs depuis les collections" });
  }
};



exports.updatePC = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const result = await updateLaptop(id, updateData);
    return res.status(200).json({ message: "PC mis à jour avec succès", result });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du PC :", error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour du PC" });
  }
};

exports.deletePC = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteLaptop(id);
    return res.status(200).json({ message: "PC supprimé avec succès", result });
  } catch (error) {
    console.error("Erreur lors de la suppression du PC :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression du PC" });
  }
};