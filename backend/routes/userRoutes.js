import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'

const router = express.Router();
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Usa o Gmail
  auth: {
    user: process.env.EMAIL_USER, // Pega do arquivo .env
    pass: process.env.EMAIL_PASS  // Pega do arquivo .env
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { favoritedEmpresas: true}
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

//buscar por email
router.get("/by-email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

//buscar por nome
router.get("/by-name/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

//buscar por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

// Cadastro
router.post('/', async (req, res) => {
  try {
    const { email, name, pass } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashPassword = await bcrypt.hash(pass, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        pass: hashPassword,
      },
    });

    const mailOptions = {
      from: 'Suporte CAPI <capivaratech383@gmail.com>', 
      to: email,
      subject: 'Bem-vindo ao CAPI! 🌿',

      text: `Olá, ${name}! \n\nSeja muito bem-vindo(a) à CAPI. \nEstamos felizes em ter você conosco para juntos melhorar o planeta. \n\nAtt, Equipe CAPI.`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email de boas-vindas enviado para ${email}`);

    res.status(201).json(newUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Não foi possível criar o usuário" });
  }
});

// aqui é para se esqueceu senha
router.post('/forgot-pass', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiry: now },
    });

    const mailOptions = {
      from: 'capivaratech383@gmail.com>', //ORIGEM
      to: email, //DESTINATARIO
      subject: 'Recuperação de Senha - CAPI', // Assunto
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
      ` 
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email enviado para ${email}`);
    res.json({ message: "Email enviado com sucesso! Verifique sua caixa de entrada." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao enviar email" });
  }
});

// Aqui é para resetar a senha e enviar a senha nova
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
      return res.status(400).json({ error: "Token inválido ou expirado" });
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

    res.json({ message: "Senha alterada com sucesso!" });

  } catch (error) {
    res.status(500).json({ error: "Erro ao resetar senha" });
  }
});

// Aqui é o LOGIN
router.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(pass, user.pass);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});



router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { email, name, pass } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { email, name, pass },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Não foi possível atualizar o usuário" });
  }
});

router.delete("/by-email/:email", async (req, res) => {
  const { email } = req.params;

  try {
    await prisma.user.delete({
      where: { email: email },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "Usuário com este email não encontrado" });
    }
    console.error(error);
    res.status(500).json({ error: "Não foi possível deletar o usuário" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: id },
    });
    res.json({ "Info": "Usuario deletado!" });
  } catch (error) {
    res.status(500).json({ error: "Não foi possível deletar o usuário" });
  }
});



//favoritar emprea
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
      include: { favoritedEmpresas: true } 
    });

    res.json(userAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Não foi possível favoritar a empresa" });
  }
});

// remove empresa dos favoritos
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
      include: { favoritedEmpresas: true }
    });

    res.json(userAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Não foi possível desfavoritar a empresa" });
  }
});

//Listar os favoritos
router.get('/:id/favoritos', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { favoritedEmpresas: true }, // pega as empresas favoritas
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user.favoritedEmpresas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar favoritos" });
  }
});

export default router;
