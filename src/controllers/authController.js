const db = require ('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try{
        const { name, email, password }= req.body;


        // 1.Criptografar a senha
        const salt = await bcrypt.getSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Salvar no banco de dados
        const [result] = await db.query(
            'INSERT INTO users (name,email, password) VALUES (?,?,?)',[name, email, hashedPassword]
        );

        res.status(201).json({ sucess: true, message: 'Usuário criado com sucesso' });
    } catch (err){
        res.status(500).json({ error: 'Erro ao registrar usuário', detalhes: err.message });
    }

};

const login = async (req, res) => {

};