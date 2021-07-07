const db = require('../db-config');

const find = () => db('users');

const findBy = filter => db('users').where(filter);

const findById = id => db('users').where({id}).first();

const add = async user => {
    const [id] = await db('users').insert(user, 'id');
    return findById(id);
}

module.exports = {
    find,
    findBy,
    findById,
    add
}