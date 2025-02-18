const db = require("../models");
const Op = db.Sequelize.Op;

const Item = db.Item;
const List = db.List;

exports.create = (req, res) => {   
    Item.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred while creating the item." });
        });
};

exports.findAll = (req, res) => {
    let where = {};
    let { title } = req.query;
    if (title) {
        where.title = { [Op.like]: `%${title}%` };
    }
    Item.findAll({
        where,
        attributes: ["id", "title", "finished"],
        include: [{
            model: List,
            as: "list",
            attributes: ["title"]
        }]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || "An error occurred while retrieving items." });
    });
};