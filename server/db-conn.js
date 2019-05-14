const mongoose = require("mongoose");

const { DB_CONN, DB_USER, DB_PW } = process.env;

// mongoose.Promise = global.Promise;
// mongoose
//     .connect(
//         DB_CONN,
//         { auth: { user: DB_USER, password: DB_PW }, useNewUrlParser: true },
//     )
//     .then(() => console.log("Successfully connected to Cosmos or Mongo DB or something..."))
//     .catch(console.error);


    mongoose.connect(process.env.COSMOSDB_CONNSTR+"?ssl=true&replicaSet=globaldb", {
        auth: {
          user: process.env.COSMODDB_USER,
          password: process.env.COSMOSDB_PASSWORD
        }
      })
      .then(() => console.log('Connection to CosmosDB successful'))
      .catch((err) => console.error(err));