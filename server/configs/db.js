const mongoose = require("mongoose");

const connectToDataBase = async () => {
  const result = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });
  console.log(`Data Connect >> ${result.connection.db.databaseName}`);
};

module.exports = connectToDataBase;
