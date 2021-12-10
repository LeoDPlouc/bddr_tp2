const { query } = require("express")
const { Op } = require("sequelize")

const spell = require("../models/spell")

module.exports.indexPost = async function (req, res, next) {
    var query = {}

    if (req.body.name)
        query.name = { [Op.regexp]: req.body.name }

    if (req.body.description)
        query.description = { [Op.regexp]: req.body.description }

    if (req.body.level)
        query.level = { [Op.regexp]: req.body.level }

    if (req.body.resistance_yes && !req.body.resistance_no)
        query.spell_resistance = true

    if (!req.body.resistance_yes && req.body.resistance_no)
        query.spell_resistance = false



    var componentRe = []

    if (req.body.S)
        componentRe.push("S")
    if (req.body.V)
        componentRe.push("V")
    if (req.body.M)
        componentRe.push("M")
    if (req.body.F)
        componentRe.push("F")
    if (req.body.DF)
        componentRe.push("DF")

    componentRe = componentRe.join("|")
    if (componentRe)
        query.components = { [Op.regexp]: componentRe }

    //alchemist barbarian bard cleric druid fighter inquisitor kineticist magus monk
    //paladin ranger rogue slayer sorcerer wizard

    classRe = []

    if (req.body.alchemist)
        classRe.push("alchemist")
    if (req.body.barbarian)
        classRe.push("barbarian")
    if (req.body.bard)
        classRe.push("bard")
    if (req.body.cleric)
        classRe.push("cleric")
    if (req.body.druid)
        classRe.push("druid")
    if (req.body.fighter)
        classRe.push("fighter")
    if (req.body.inquisitor)
        classRe.push("inquisitor")
    if (req.body.kineticist)
        classRe.push("kineticist")
    if (req.body.magus)
        classRe.push("magus")
    if (req.body.monk)
        classRe.push("monk")
    if (req.body.paladin)
        classRe.push("paladin")
    if (req.body.ranger)
        classRe.push("ranger")
    if (req.body.rogue)
        classRe.push("rogue")
    if (req.body.slayer)
        classRe.push("slayer")
    if (req.body.sorcerer)
        classRe.push("sorcerer")
    if (req.body.wizard)
        classRe.push("wizard")

    classeRe = classeRe.join("|")
    if (classeRe)
        query.classes = { [Op.regexp]: classeRe }

    if (Object.keys(query).length) {
        var spells = await spell.findAll({ where: query })
        console.log(spells)
    }

    console.log(req.body)
    console.log(query)
}

module.exports.indexGet = function (req, res, next) {
    res.render("index")
}