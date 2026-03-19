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
        origin: ['http://localhost:5173','https://grizzlyess.github.io'],
        credentials: true,
    })
);

app.use(express.json());

app.set('trust proxy', 1); 

app.use(
    session({
        name: 'sessionId',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true, // 2. AGORA É TRUE! Pois estamos em HTTPS no Render
            sameSite: 'none', // 3. OBRIGATÓRIO! Libera o cookie para viajar do Render para o GitHub Pages
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
