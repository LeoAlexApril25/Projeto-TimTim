const db = require('../config/db');


const create = async (req, res) => {
    try{
        const { product_id, quantity, production_date} = req.body;

        const [result] = await db.query (
            'INSERT INTO productions (product_id, quantity,    production_date) VALUES (?,?,?)',[
            product_id, quantity, production_date]
        );

        res.status(201).json({
            sucess: true,
            message: 'Produção registrada com sucesso!',
            id: result.insertId
        });

    }catch(err){
        res.status(500).json({ error:
            'Erro ao registrar produção', 
             detalhes: err.message
        });
    }
};

const getAll = async (req, res) => {
    try{
        const [rows] = await db.query('SELECT p.id, pr.name AS product_name, p.quantity, p.production_date FROM productions p JOIN products pr ON p.product_id = pr.id ORDER BY p. production_date DESC');

        res.json(rows);    
    } catch(err){
        res.status(500).json({ error: 'Erro ao listar produções', detalhes: err.message});
    }
}

module.exports = { create, getAll};