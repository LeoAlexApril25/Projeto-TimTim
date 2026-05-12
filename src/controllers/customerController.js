const db = require('../config/db');

const create = async (req, res) => {
    try{
        const { name, phone, email, adress} = req.body;
        const [result] = await db.query(
            'INSERT INTO customers (name, phone, email, adress) VALUES (?,?,?,?)',[name, phone, email,
                adress]
        );
        res.status(201).json({ success: true, id: result.insertId, message: 'Cliente criado com sucesso' });
    } catch (err){
        res.status(500).json({ error: 'Erro ao criar cliente', detalhes: err.message });
    }
};

const getAll = async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM customers ORDER BY name ASC');
        res.json(rows);

    } catch (err){
        res.status(500).json({ error: 'Erro ao obter listas clientes', detalhes: err.message });

    }
};

module.exports = { create, getAll};