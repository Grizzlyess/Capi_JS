import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import empresaRoutes from './routes/empresaRoutes.js';
import calculoRoutes from './routes/calculoRoutes.js';
import mensagemRoutes from './routes/mensagemRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';
dotenv.config();

const app = express();
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());

app.use(
    session({
        name: 'sessionId',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false, // true em produção (https)
            maxAge: 1000 * 60 * 60, // 1h
        },
    })
);

app.use('/user', userRoutes);
app.use('/empresa', empresaRoutes);
app.use('/calculo', calculoRoutes);
app.use('/mensagem', mensagemRoutes);
app.use('/produtos', produtoRoutes);

app.listen(8080, () => console.log('Servidor iniciado na porta 8080'));
