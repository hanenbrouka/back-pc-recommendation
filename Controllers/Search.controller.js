
const { getLaptopsByPriceRange  } = require('../config/db');


exports.getPCsByPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.query;
  
    if (!minPrice || !maxPrice) {
      return res.status(400).json({ message: "Veuillez fournir un intervalle de prix valide" });
    }
  
    try {
      const laptopsByCategory = await getLaptopsByPriceRange(parseFloat(minPrice), parseFloat(maxPrice));
      if (Object.keys(laptopsByCategory).every(category => laptopsByCategory[category].length === 0)) {
        return res.status(404).json({ msg: "Aucun PC trouvé dans cet intervalle de prix" });
      } else {
        return res.status(200).json(laptopsByCategory);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des PCs par intervalle de prix :", error);
      return res.status(500).json({ message: "Erreur lors de la récupération des PCs par intervalle de prix" });
    }
  };