const db = require("../models");
const Op = db.Sequelize.Op;

const Item = db.Item;
const List = db.List;

const getPagination = require("../utils/get-pagination");

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
    let {page, size} = req.query;
        if (!page) {
            page = 0;
        };
        if (!size) {
            size = 3;
        };
    let {limit, offset} = getPagination(page, size);
    let where = {};
    let { title } = req.query;
    if (title) {
        where.title = { [Op.like]: `%${title}%` };
    };
    Item.findAndCountAll({
        where,
        limit,
        offset,
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