const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb://localhost:27017";
const dbName = "Laptops_scored_base";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function getLaptopsFromCollections() {
  try {
    await client.connect();
    const database = client.db(dbName);

    const cG = database.collection('Gaming');
    const cL = database.collection('Laptops');
    const cP = database.collection('Laptops PRO');
    const cU = database.collection('Ultrabook');

    const laptopsGaming = await cG.find().toArray();
    const laptopsLaptops = await cL.find().toArray();
    const laptopsLaptopsPro = await cP.find().toArray();
    const laptopsUltrabook = await cU.find().toArray();

    const laptopsByCategory = {
      Gaming: laptopsGaming,
      Laptops: laptopsLaptops,
      "Laptops PRO": laptopsLaptopsPro,
      Ultrabook: laptopsUltrabook
    };

    return laptopsByCategory;
  } finally {
    await client.close();
  }
}

async function updateLaptop(id, updateData) {
  try {
    await client.connect();
    const database = client.db(dbName);

    const result = await database.collection('Gaming').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      throw new Error('PC non trouvé');
    }

    return result;
  } finally {
    await client.close();
  }
}

async function deleteLaptop(id) {
  try {
    await client.connect();
    const database = client.db(dbName);

    const result = await database.collection('Gaming').deleteOne(
      { _id: new ObjectId(id) }
    );

    if (result.deletedCount === 0) {
      throw new Error('PC non trouvé');
    }

    return result;
  } finally {
    await client.close();
  }
}
async function getLaptopsByPriceRange(minPrice, maxPrice) {
  try {
    await client.connect();
    const database = client.db(dbName);

    const cG = database.collection('Gaming');
    const cL = database.collection('Laptops');
    const cP = database.collection('Laptops PRO');
    const cU = database.collection('Ultrabook');

    const filter = { price: { $gte: minPrice, $lte: maxPrice } };

    const laptopsGaming = await cG.find(filter).toArray();
    const laptopsLaptops = await cL.find(filter).toArray();
    const laptopsLaptopsPro = await cP.find(filter).toArray();
    const laptopsUltrabook = await cU.find(filter).toArray();

    const laptopsByCategory = {
      Gaming: laptopsGaming,
      Laptops: laptopsLaptops,
      "Laptops PRO": laptopsLaptopsPro,
      Ultrabook: laptopsUltrabook
    };

    return laptopsByCategory;
  } finally {
    await client.close();
  }
}

module.exports = { getLaptopsFromCollections, updateLaptop, deleteLaptop, getLaptopsByPriceRange };
