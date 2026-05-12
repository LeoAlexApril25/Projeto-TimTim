const db = require('../config/db');

const getSummary = async (req, res ) => {
    try{
        // 1. Faturamento Total do Mês Atual
    const [ revenue ] = await db.query (`
        SELECT SUM(s.quantity * p.sale_price) AS total_revenue
        FROM sales s
        JOIN products p ON s.product_id = p.id
        WHERE MONTH(s.sale_date) = MONTH(CURRENT_DATE())`
    );

    // 2. Top 3 produtos mais vendidos
    const [topProducts] = await db.query (`
        SELECT p.name, SUM(s.quantity) AS total_sold
        FROM sales s
        JOIN products p ON s.product_id = p.id
        GROUP BY p.id
        ORDER BY total_sold DESC
        LIMIT 3`
    );

    // 3. Alertas de estoque baixo (menos de 5 unidades)
    const [lowStock] = await db.query (`
        SELECT name, stock_quantity
        FROM ingredients
        WHERE stock_quantity < 5
        `);

    } catch(err){
        res.status(500).json({ error: 'Erro ao gerar dashboard', detalhes: err.message});

    }
};

module.exports = { getSummary};
