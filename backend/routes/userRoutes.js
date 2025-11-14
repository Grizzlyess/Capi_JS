import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();


router.post('/', async (req, res) => {
  try {
    const { email, name, pass } = req.body;
    const newUser = await prisma.user.create({
      data: { email, name, pass },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Não foi possível criar o usuário" });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});



export default router; // Exporta o roteador