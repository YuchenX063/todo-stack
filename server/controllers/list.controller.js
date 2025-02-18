const db = require("../models");
const Op = db.Sequelize.Op;

const List = db.List;
const Item = db.Item;

exports.create = (req, res) => {
    List.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred while creating the list." });
        });
};

exports.findAll = (req, res) => {
    List.findAll({
        include: [{
            model: Item,
            as: "items"
        }]
    }).then(data => {
        res.send(data);
    });
};

exports.findAllTwo = async (req, res) => {
    let results = await List.findAll({
        include: [{
            model: Item,
            as: "items"
        }]
    });
    res.send(results);
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    List.findByPk(id, {
        include: [{
            model: Item,
            as: "items",
            attributes: ["id", "title", "finished"]
        }]
    }).then(data => {
        res.send(data);
    });
};