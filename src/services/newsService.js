const News = require("../models/News");

const create = (body) => News.create(body);

const findAll = () => News.find();


module.exports = {
    create,
    findAll
}