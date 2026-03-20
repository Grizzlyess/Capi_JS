import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const router = express.Router();
const prisma = new PrismaClient();

// --- CONFIGURAÇÃO DO GMAIL (NODEMAILER) ---
/*const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Seu gmail real
        pass: process.env.EMAIL_PASS  // A senha de app de 16 letras
    }
});*/

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true para porta 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // No Render, cole SEM espaços!
    },
    tls: {
        // Isso ajuda a ignorar bloqueios de certificado comuns em servidores Linux/Nuvem
        rejectUnauthorized: false 
    }
});

// Verificação de conexão (adicione isso para ver o log no Render)
transporter.verify(function (error, success) {
    if (error) {
        console.log("❌ Erro na configuração do Nodemailer:", error);
    } else {
        console.log("✅ Servidor de e-mail pronto para enviar mensagens");
    }
});

// GET - Listar todos
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { favoritedEmpresas: true },
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// GET - Buscar por email
router.get('/by-email/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

// GET - Buscar por nome
router.get('/by-name/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// GET - Buscar por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

// POST - Cadastro (Com envio de email corrigido)
router.post('/', async (req, res) => {
    try {
        const { email, name, pass } = req.body;

        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const hashPassword = await bcrypt.hash(pass, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                pass: hashPassword,
            },
        });

        // Configuração do Email de Boas-vindas
        const mailOptions = {
            from: `Suporte CAPI <${process.env.EMAIL_USER}>`, // Usa o email do .env
            to: email,
            subject: 'Bem-vindo ao CAPI! 🌿',
            text: `Olá, ${name}! \n\nSeja muito bem-vindo(a) à CAPI. \nEstamos felizes em ter você conosco para juntos melhorar o planeta. \n\nAtt, Equipe CAPI.`,
        };

        // Tenta enviar o email, mas não trava o cadastro se der erro
        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Email de boas-vindas enviado para ${email}`);
        } catch (mailError) {
            console.error('❌ Erro ao enviar email de boas-vindas:', mailError);
            // Não retornamos erro 500 aqui para não cancelar o cadastro do usuário
        }

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Não foi possível criar o usuário' });
    }
});

// POST - Esqueci minha senha (Com envio corrigido)
router.post('/forgot-pass', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const token = Math.floor(100000 + Math.random() * 900000).toString();
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await prisma.user.update({
            where: { id: user.id },
            data: { resetToken: token, resetTokenExpiry: now },
        });

        const mailOptions = {
            from: `Suporte CAPI <${process.env.EMAIL_USER}>`, // CORRIGIDO: Usa o Gmail do .env
            to: email,
            subject: 'Recuperação de Senha - CAPI',
            text: `Seu código de verificação é: ${token}`,
            html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Recuperação de Senha</h2>
          <p>Olá, ${user.name}!</p>
          <p>Você solicitou a redefinição de sua senha.</p>
          <p>Seu código de verificação é:</p>
          <h1 style="color: #4CAF50; letter-spacing: 5px;">${token}</h1>
          <p>Este código expira em 1 hora.</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email de recuperação enviado para ${email}`);
        
        res.json({ message: 'Email enviado com sucesso! Verifique sua caixa de entrada.' });
    } catch (error) {
        console.error('❌ Erro no forgot-pass:', error);
        res.status(500).json({ error: 'Erro ao enviar email' });
    }
});

// POST - Resetar a senha
router.post('/reset-pass', async (req, res) => {
    const { token, newPass } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() },
            },
        });

        if (!user) {
            return res.status(400).json({ error: 'Token inválido ou expirado' });
        }

        const hashPassword = await bcrypt.hash(newPass, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                pass: hashPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        res.json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao resetar senha' });
    }
});

// POST - Login
router.post('/login', async (req, res) => {
    const { email, pass } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(pass, user.pass))) {
            return res.status(401).json({ status: false });
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        res.json(req.session.user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

router.get('/login/me', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Não autenticado' });
    }
    res.json(req.session.user);
});

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('sessionId');
        res.json({ success: true });
    });
});

// PUT - Atualizar usuário
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, name, pass } = req.body;

    try {
        const dataToUpdate = {
            email,
            name,
        };

        if (pass) {
            dataToUpdate.pass = await bcrypt.hash(pass, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: dataToUpdate,
        });

        req.session.user = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
        };

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Não foi possível atualizar o usuário' });
    }
});

// DELETE - Deletar por email
router.delete('/by-email/:email', async (req, res) => {
    const { email } = req.params;

    try {
        await prisma.user.delete({
            where: { email: email },
        });

        res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Usuário com este email não encontrado' });
        }
        console.error(error);
        res.status(500).json({ error: 'Não foi possível deletar o usuário' });
    }
});

// DELETE - Deletar por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.calculoCarbono.deleteMany({
            where: { userId: id },
        });

        await prisma.user.update({
            where: { id },
            data: {
                favoritedEmpresas: {
                    set: [],
                },
            },
        });

        await prisma.user.delete({
            where: { id },
        });

        req.session.destroy(() => {
            res.clearCookie('sessionId');
            res.json({ info: 'Usuário deletado com sucesso!' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Não foi possível deletar o usuário' });
    }
});

// PATCH - Favoritar empresa
router.patch('/:id/favoritos/:empresaId', async (req, res) => {
    const { id, empresaId } = req.params;

    try {
        const userAtualizado = await prisma.user.update({
            where: { id: id },
            data: {
                favoritedEmpresas: {
                    connect: { id: empresaId },
                },
            },
            include: { favoritedEmpresas: true },
        });

        res.json(userAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível favoritar a empresa' });
    }
});

// DELETE - Remover empresa dos favoritos
router.delete('/:id/favoritos/:empresaId', async (req, res) => {
    const { id, empresaId } = req.params;

    try {
        const userAtualizado = await prisma.user.update({
            where: { id: id },
            data: {
                favoritedEmpresas: {
                    disconnect: { id: empresaId },
                },
            },
            include: { favoritedEmpresas: true },
        });

        res.json(userAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível desfavoritar a empresa' });
    }
});

// GET - Listar os favoritos
router.get('/:id/favoritos', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: { favoritedEmpresas: true },
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(user.favoritedEmpresas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar favoritos' });
    }
});

router.patch('/promote-admin', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { role: "ADMIN"},
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao promover usuário a admin' });
    }
});

export default router;