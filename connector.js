const { Sequelize } = require("sequelize")

//Open a connection to the database
const Connector = new Sequelize('database', 'root', 'admin', {
    host: 'localhost',
    dialect: "mariadb"
});

Connector.authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => ("Connection to database failed\nTrace: " + err))

module.exports = Connector