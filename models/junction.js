const { DataTypes } = require("sequelize")
const Connector = require("../connector")

const Creature = require("./creature")
const Spell = require("./spell")

const Junction = Connector.define("Junction", {})

Junction.belongsTo(Creature)
Junction.belongsTo(Spell)

Junction.sync({ alter: true }).catch((err) => console.error(err))

module.exports = Junction