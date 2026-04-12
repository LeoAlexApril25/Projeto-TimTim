const db = require('../config/db');

const create = async (req, res) => {
    try{
        const { product_id, quantity, sale_date} = req.body;

        const [result] = await db.query (
           'INSERT INTO sales ( product_id, quantity, sale_date) VALUES (?,?,?)', [product_id, quantity, sale_date]
        );

        res.status(201).json({
            sucess: true,
            message: 'Venda registrada com sucesso!',
            id: result.insertId
        });
    } catch(err){
        res.status(500).json({
            error: 'Erro ao registrar venda',
            detalhes: err.message
        });
    }
}

const getAll = async (req, res) => {
    try{
        const [rows] = await db.query(`
            SELECT s.id, p.name AS product_name, s.quantity, s.sale_date FROM sales s JOIN products p ON s.product_id = p.id ORDER BY s.sale_date DESC`
        );

        res.json(rows);
    }catch(err){
        res.status(500).json({ 
            error: 'Erro ao listar vendas', detalhes: err.message });
    }
}



module.exports = { create, getAll};