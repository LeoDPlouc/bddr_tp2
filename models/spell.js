const { DataTypes } = require("sequelize")
const { Connector } = require("../index")

const Creature = require("./creature")

const Spell = Connector.define("Spell", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    wizard: {
        type: DataTypes.BOOLEAN
    },
    level: {
        type: DataTypes.INTEGER
    },
    component: {
        type: DataTypes.STRING
    },
    spell_resistance: {
        type: DataTypes.BOOLEAN
    }

})

Creature.hasMany(Spell)
Spell.hasMany(Creature)

Spell.sync({ alter: true }).catch((err) => console.error(err))

module.exports = Spell