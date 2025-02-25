const db = require("../models");
const getPagination = require("../utils/get-pagination");
const Op = db.Sequelize.Op;

const List = db.List;
const Item = db.Item;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty!"
        });
        return;
    };
    if (typeof req.body.title != 'string') {
        res.status(400).send({
            message: "Title must be a string!"
        });
        return;
    };
    List.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred while creating the list." });
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
    List.findAndCountAll({
        where,
        limit,
        offset,
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

exports.update = (req, res) => {
    let itemId = req.params.id;
    let reqObject = {};
    // validation
    if (typeof req.body.title != 'string') {
        res.status(400).send({
            message: "Title must be a string!"
        });
        return;
    };
    reqObject = {
        title: req.body.title
    };
    List.findOne({ where: {id: itemId}})
        .then()
        .catch(err => {
            res.status(500).send({ message: err.message || "Could not find existing item." });
            return;
        });
    List.update(reqObject,{where: {id: itemId}} )
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "List was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update List with id=${itemId}. Maybe List was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating List with id=" + itemId
            });
        });
};