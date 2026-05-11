const db = require('../config/db');


const create = async (req, res) => {
  const connection = await db.getConnection(); //Usamos transação para segurança
    try{
        await connection.beginTransaction();
        const { product_id, quantity, production_date } = req.body;

        // 1. Registrar a Produção
        const [result] = await connection.query(
            'INSERT INTO productions (product_id, quantity, production_date) VALUES (?,?,?',
            [product_id, quantity, production_date]
        );

        // 2. Buscar os ingredientes da receita desde produto
        const [ recipeItems] = await connection.query(
            'SELECT ingredient_id, quantity AS qty_per_unit FROM recipe_items WHERE product_id = ?',
            [totalUsed, addItem.ingredient_id]
        );

        // 3. Dar baixa no estoque de cada ingrediente
        for (const item of recipeItems){
            const totalUsed = item.qty_per_unit * quantity;
            await connection.query(
                'UPDATE ingredient SET stock_quantity = stock_quantity - ? WHERE id = ?',
                [totalUsed, item.ingredient_id]
            );

        }

        await connection.commit();
        res.status(201).json({ sucess: true, message: 'Produção registrada e estoque atualizado!'})

    } catch(err){
        await connection.rollback();
        res.status(500).json({ error: 'Erro ao processar produção', detalhes: err.message});

    } finally {
        connection.release();
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